import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useState, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Paperclip, Send } from "lucide-react";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import { useAuth } from "@/contexts/AuthContext";

type Channel = "doctor" | "moms";
type Message = { id: number | string; text: string; sender: string; timestamp: string; channel: Channel; userEmail?: string };

const initialDoctorMessages: Message[] = [
  { id: 1, text: "Good morning! This is Dr. Ushemakota. How can I assist you today?", sender: "Dr. Ushemakota", timestamp: "9:00 AM", channel: "doctor" },
];

const initialMomsMessages: Message[] = [
  { id: 1, text: "Welcome to Moms Chat! Share your experiences and tips.", sender: "Moderator", timestamp: "2:30 PM", channel: "moms" },
];

const ContactCenter = () => {
  const { user } = useAuth();
  const [activeChannel, setActiveChannel] = useState<Channel>('doctor');
  const [messages, setMessages] = useState<Message[]>(initialDoctorMessages);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    const bootstrapLocal = () => {
      setMessages(activeChannel === 'doctor' ? initialDoctorMessages : initialMomsMessages);
    };

    const bootstrapSupabase = async () => {
      if (!isSupabaseConfigured || !supabase) return bootstrapLocal();
      // Fetch existing messages for the channel
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .eq('channel', activeChannel)
        .order('created_at', { ascending: true });
      if (error) {
        console.error('Supabase fetch error:', error);
        return bootstrapLocal();
      }
      const formatted: Message[] = (data || []).map((m: any) => ({
        id: m.id,
        text: m.text,
        sender: m.sender,
        timestamp: new Date(m.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        channel: m.channel,
        userEmail: m.user_email,
      }));
      setMessages(formatted.length ? formatted : (activeChannel === 'doctor' ? initialDoctorMessages : initialMomsMessages));

      // Realtime subscribe
      const channel = supabase.channel(`messages-${activeChannel}`)
        .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'messages', filter: `channel=eq.${activeChannel}` }, (payload: any) => {
          const m = payload.new;
          setMessages(prev => [...prev, {
            id: m.id,
            text: m.text,
            sender: m.sender,
            timestamp: new Date(m.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            channel: m.channel,
            userEmail: m.user_email,
          }]);
        })
        .subscribe();

      return () => {
        supabase.removeChannel(channel);
      };
    };

    const cleanup = bootstrapSupabase();
    return () => {
      if (typeof cleanup === 'function') cleanup();
    };
  }, [activeChannel]);

  const handleSendMessage = async () => {
    if (newMessage.trim()) {
      const baseMsg: Message = {
        id: Date.now(),
        text: newMessage,
        sender: user?.userType === 'doctor' ? (user?.name || 'Doctor') : 'user',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        channel: activeChannel,
        userEmail: user?.email,
      };

      // Local optimistic update
      setMessages([...messages, baseMsg]);
      setNewMessage("");

      // Persist to Supabase if configured
      if (isSupabaseConfigured && supabase) {
        const { error } = await supabase.from('messages').insert({
          text: baseMsg.text,
          sender: baseMsg.sender,
          channel: baseMsg.channel,
          user_email: baseMsg.userEmail,
          created_at: new Date().toISOString(),
        });
        if (error) {
          console.error('Supabase insert error:', error);
        }
      } else {
        // Fallback: store in localStorage per channel
        const key = `messages-${activeChannel}`;
        const existing = JSON.parse(localStorage.getItem(key) || '[]');
        localStorage.setItem(key, JSON.stringify([...existing, baseMsg]));
      }
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-center text-primary mb-12">Contact Center</h1>
        
        {/* Chat Section */}
        <section className="mb-12">
          <div className="flex justify-center gap-4 mb-6">
            <Button
              onClick={() => setActiveChannel('doctor')}
              variant={activeChannel === 'doctor' ? 'default' : 'outline'}
              size="lg"
            >
              Doctor Chat
            </Button>
            <Button
              onClick={() => setActiveChannel('moms')}
              variant={activeChannel === 'moms' ? 'default' : 'outline'}
              size="lg"
            >
              Moms Chat
            </Button>
          </div>

          <div className="bg-card p-6 rounded-lg shadow-medium border border-border h-[600px] flex flex-col">
            <div className="flex-grow overflow-y-auto space-y-6 p-4">
              {messages.map((message) => (
                <div key={message.id} className={`flex items-end gap-3 ${message.sender === 'user' ? 'justify-end' : ''}`}>
                  {message.sender !== 'user' && (
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={'/placeholder.svg'} alt={message.sender} />
                      <AvatarFallback>
                        {activeChannel === 'doctor' ? 'Dr' : message.sender.substring(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  )}
                  <div className={`max-w-xs lg:max-w-md p-4 rounded-2xl ${message.sender === 'user' ? 'bg-primary text-primary-foreground rounded-br-none' : 'bg-muted text-muted-foreground rounded-bl-none'}`}>
                    {(activeChannel === 'moms' || message.sender !== 'user') && (
                      <p className="text-xs font-bold mb-1">{message.sender}</p>
                    )}
                    <p className="text-sm">{message.text}</p>
                    <p className="text-xs text-right mt-2 opacity-70">{message.timestamp}</p>
                  </div>
                  {message.sender === 'user' && (
                    <Avatar className="h-10 w-10">
                      <AvatarImage src="/placeholder.svg" alt="User" />
                      <AvatarFallback>You</AvatarFallback>
                    </Avatar>
                  )}
                </div>
              ))}
            </div>
            <div className="mt-4 flex items-center gap-2">
              <Button variant="ghost" size="icon">
                <Paperclip className="h-5 w-5" />
              </Button>
              <Input 
                type="text" 
                placeholder="Type your message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                className="flex-grow"
              />
              <Button onClick={handleSendMessage} size="icon">
                <Send className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ContactCenter;