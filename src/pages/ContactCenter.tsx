import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useState, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Paperclip, Send } from "lucide-react";

const initialDoctorMessages = [
  { id: 1, text: "Good morning! This is Dr. Ushemakota. How can I assist you today?", sender: "Dr. Ushemakota", timestamp: "9:00 AM" },
  { id: 2, text: "Good morning, Doctor. I've been experiencing some mild cramping. Is this normal in the second trimester?", sender: "user", timestamp: "9:02 AM" },
  { id: 3, text: "Mild cramping can be normal as your uterus expands, but it's always good to be cautious. Are you experiencing any other symptoms, like bleeding or severe pain?", sender: "Dr. Ushemakota", timestamp: "9:03 AM" },
  { id: 4, text: "No, nothing else. Just the cramping.", sender: "user", timestamp: "9:05 AM" },
  { id: 5, text: "In that case, I recommend you rest and stay hydrated. If the cramping gets worse or you notice any other symptoms, please let me know immediately. We can schedule a check-up to be safe.", sender: "Dr. Ushemakota", timestamp: "9:06 AM" },
];

const initialMomsMessages = [
  { id: 1, text: "Hey everyone! I'm feeling so tired lately, any tips for boosting energy in the third trimester?", sender: "Amai Wadson", timestamp: "2:30 PM" },
  { id: 2, text: "I totally get that! I found short walks and iron-rich foods really helped me.", sender: "Mhamha VaCarlos", timestamp: "2:32 PM" },
  { id: 3, text: "Has anyone tried prenatal yoga for back pain? I'm desperate!", sender: "user", timestamp: "2:35 PM" },
  { id: 4, text: "Yes! It was a lifesaver for me. There's a great online class I can recommend.", sender: "Umama kaNkosi", timestamp: "2:36 PM" },
];

const ContactCenter = () => {
  const [activeChannel, setActiveChannel] = useState<'doctor' | 'moms'>('doctor');
  const [messages, setMessages] = useState(initialDoctorMessages);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    if (activeChannel === 'doctor') {
      setMessages(initialDoctorMessages);
    } else {
      setMessages(initialMomsMessages);
    }
  }, [activeChannel]);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const newMsg = { id: Date.now(), text: newMessage, sender: "user", timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
      setMessages([...messages, newMsg]);
      setNewMessage("");
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