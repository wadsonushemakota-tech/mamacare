import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Youtube, ExternalLink, Instagram, PanelTopClose as TikTok, YoutubeIcon, Brain, Lightbulb, Users, BookOpen, Stethoscope, GraduationCap, Activity } from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import React from "react";
import ArticleDisplay from "@/components/ArticleDisplay";
import { articles } from "@/data/articles";

interface ApiArticle {
  _id: string;
  content: string;
  title: string;
  url?: string; // Added url for external links
}

// Website Modal Component
function WebsiteModal(props: { isOpen: boolean; onClose: () => void; websiteUrl: string; websiteName: string }) {
  const { isOpen, onClose, websiteUrl, websiteName } = props;
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div className="relative w-full max-w-6xl mx-4 h-[90vh]">
        <div className="bg-card text-card-foreground rounded-lg shadow-lg overflow-hidden flex flex-col h-full">
          <div className="p-4 flex justify-between items-center border-b">
            <h3 className="text-lg font-semibold">{websiteName}</h3>
            <button 
              onClick={onClose} 
              className="px-4 py-2 rounded bg-muted text-muted-foreground hover:bg-muted/80 transition-colors"
            >
              Close
            </button>
          </div>
          <div className="flex-1 w-full bg-white relative">
            <iframe
              src={websiteUrl}
              title={websiteName}
              className="w-full h-full"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// Lightweight inline VideoModal to avoid external module resolution issues
function VideoModal(props: { isOpen: boolean; onClose: () => void; videoUrl: string; platform?: 'youtube' | 'tiktok' | 'instagram' }) {
  const { isOpen, onClose, videoUrl, platform } = props;
  if (!isOpen) return null;

  const getYouTubeId = (url: string) => {
    const regExp = /^.*(?:youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]{11}).*/;
    const match = url.match(regExp);
    return match ? match[1] : null;
  };

  const getTikTokId = (url: string) => {
    // match /video/{id}
    const m = url.match(/\/video\/(\d+)/);
    if (m) return m[1];
    // vm.tiktok short links usually redirect; best-effort: extract last numeric segment
    const parts = url.split('/');
    const last = parts[parts.length - 1] || parts[parts.length - 2];
    return /^\d+$/.test(last) ? last : null;
  };

  const getInstagramId = (url: string) => {
    // match /p/{id}/ or /reel/{id}/
    const m = url.match(/\/(p|reel|tv)\/([^\/\?]+)/);
    return m ? { type: m[1], id: m[2] } : null;
  };

  const getEmbedUrl = (url: string, platform?: string) => {
    if (!platform) return url;
    if (platform === 'youtube') {
      const id = getYouTubeId(url);
      return id ? `https://www.youtube.com/embed/${id}?autoplay=1&rel=0` : url;
    }
    if (platform === 'tiktok') {
      const id = getTikTokId(url);
      // use TikTok embed v2 which avoids redirect loops that happen with page URLs
      return id ? `https://www.tiktok.com/embed/v2/${id}` : url;
    }
    if (platform === 'instagram') {
      const parsed = getInstagramId(url);
      return parsed ? `https://www.instagram.com/${parsed.type}/${parsed.id}/embed/` : url;
    }
    return url;
  };

  const embedUrl = getEmbedUrl(videoUrl, platform);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div className="relative w-full max-w-3xl mx-4">
        <div className="bg-card text-card-foreground rounded-lg shadow-lg overflow-hidden">
          <div className="p-3 flex justify-end">
            <button onClick={onClose} className="px-3 py-1 rounded bg-muted text-muted-foreground">
              Close
            </button>
          </div>
          <div className="w-full aspect-video bg-black">
            <iframe
              src={embedUrl}
              title="Video"
              className="w-full h-full"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      </div>
    </div>
  );
}

interface VideoResource {
  title: string;
  description: string;
  url: string;
  platform: 'youtube' | 'tiktok' | 'instagram';
  icon: React.ElementType; // Add this for the video.icon reference
}

// Update the videoResources array with verified YouTube URLs:
const videoResources: VideoResource[] = [
  {
    title: "Pregnancy Tips",
    description: "Essential tips for a healthy pregnancy",
    url: "https://www.youtube.com/watch?v=wk2ea9F2iZA",
    platform: "youtube",
    icon: YoutubeIcon
  },
  {
    title: "Pregnancy Nutrition",
    description: "More tips on eating well during pregnancy",
    url: "https://www.youtube.com/embed/pYHfccBguu4",
    platform: "youtube",
    icon: Activity
  },
  {
    title: "Sleeping Position Mistakes",
    description: "Learn the best sleeping positions during pregnancy and what to avoid.",
    url: "https://www.youtube.com/watch?v=5PNFKQvR550",
    platform: "youtube",
    icon: Activity
  },
  {
    title: "Exercise During Pregnancy",
    description: "Safe exercises for each trimester",
    url: "https://www.youtube.com/watch?v=lKx0sOz31C4",
    platform: "youtube",
    icon: Activity
  },
  {
    title: "Mental Health in Pregnancy",
    description: "Understanding and managing mental health during pregnancy",
    url: "https://www.youtube.com/watch?v=0WCwC-3nTdg",
    platform: "youtube",
    icon: Brain
  },
  {
    title: "What is FASD",
    description: "Understanding Fetal Alcohol Spectrum Disorders",
    url: "https://www.youtube.com/watch?v=uHH3vyWFapM",
    platform: "youtube",
    icon: Brain
  },
  {
    title: "Preparing for Labor",
    description: "What to expect during labor and delivery",
    url: "https://www.youtube.com/watch?v=HkpRc8HXVNU&t=5s",
    platform: "youtube",
    icon: GraduationCap
  },
  {
    title: "Postpartum Recovery",
    description: "Essential information about postpartum care",
    url: "https://www.youtube.com/watch?v=dHdh3eNZnW8",
    platform: "youtube",
    icon: BookOpen
  }
]

interface WebsiteResource {
  name: string;
  url: string;
  description: string;
}

const Resources = () => {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false)
  const [isWebsiteModalOpen, setIsWebsiteModalOpen] = useState(false)
  const [isArticleModalOpen, setIsArticleModalOpen] = useState(false)
  const [currentVideo, setCurrentVideo] = useState<VideoResource | null>(null)
  const [currentWebsite, setCurrentWebsite] = useState<WebsiteResource | null>(null)
  const [currentArticle, setCurrentArticle] = useState<Article | null>(null)
  const [videoCache, setVideoCache] = useState<{ [key: string]: string }>({})
  
  const apiArticles: ApiArticle[] = [
    { _id: "1", title: "Pregnancy Nutrition Guide", content: "Essential foods and supplements for a healthy pregnancy.", url: "https://www.who.int/news-room/fact-sheets/detail/maternal-mortality" },
    { _id: "2", title: "Managing Pregnancy Fatigue", content: "Tips and tricks to combat tiredness during your pregnancy journey.", url: "https://www.babycenter.com/pregnancy/feel-better/fatigue-during-pregnancy" },
    { _id: "3", title: "Mindfulness for Expectant Moms", content: "Practices to reduce stress and promote well-being.", url: "https://www.whattoexpect.com/pregnancy/mind-and-body/mindfulness-during-pregnancy" },
  ];

  const handleVideoClick = (video: VideoResource) => {
    setCurrentVideo(video);
    setIsVideoModalOpen(true);
  };

  // Handle website click - open in modal
  const handleWebsiteClick = (website: WebsiteResource) => {
    setCurrentWebsite(website);
    setIsWebsiteModalOpen(true);
  };

  // Handle article click - open in modal
  const handleArticleClick = (article: Article) => {
    setCurrentArticle(article);
    setIsArticleModalOpen(true);
  };

  const handleVideoModalClose = () => {
    setIsVideoModalOpen(false);
    setCurrentVideo(null);
  };

  const handleWebsiteModalClose = () => {
    setIsWebsiteModalOpen(false);
    setCurrentWebsite(null);
  };

  const handleArticleModalClose = () => {
    setIsArticleModalOpen(false);
    setCurrentArticle(null);
  };

  const websites: WebsiteResource[] = [
    {
      name: "American Pregnancy Association",
      url: "https://americanpregnancy.org",
      description: "Evidence-based pregnancy information and resources"
    },
    {
      name: "Healthline - Pregnancy",
      url: "https://www.healthline.com/health/pregnancy",
      description: "Medical articles reviewed by healthcare professionals"
    },
    {
      name: "ACOG - Women's Health",
      url: "https://www.acog.org/womens-health",
      description: "Professional medical organization providing evidence-based guidelines"
    },
    {
      name: "CDC - Pregnancy",
      url: "https://www.cdc.gov/pregnancy/index.html",
      description: "Centers for Disease Control pregnancy health information"
    },
    {
      name: "WebMD - Pregnancy",
      url: "https://www.webmd.com/baby/default.htm",
      description: "Comprehensive pregnancy health information"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-accent/20">
      <Navbar />
      
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <h1 className="text-5xl font-bold mb-6">
              Pregnancy{" "}
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Resources
              </span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Curated videos and websites to support your pregnancy journey
            </p>
          </div>

          {/* Article Resources */}
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 rounded-full bg-gradient-to-br from-primary to-secondary">
                <BookOpen className="h-6 w-6 text-primary-foreground" />
              </div>
              <h2 className="text-3xl font-bold">Articles</h2>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {articles.map((article, index) => (
                <Card
                  key={index}
                  className="group overflow-hidden border-2 hover:border-primary transition-all duration-300 hover:shadow-medium"
                >
                  <div className="p-6 space-y-4">
                    <div>
                      <h3 className="text-xl font-semibold mb-2">{article.title}</h3>
                      <p className="text-sm text-muted-foreground">{article.description}</p>
                    </div>
                    <Button 
                      onClick={() => handleArticleClick(article)}
                      className="w-full bg-gradient-to-r from-primary to-secondary"
                    >
                      <BookOpen className="h-4 w-4 mr-2" />
                      Read Article
                    </Button>
                </div>
              </Card>
              ))}
            </div>
          </div>

          {/* Video Resources */}
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 rounded-full bg-gradient-to-br from-primary to-secondary">
                <Youtube className="h-6 w-6 text-primary-foreground" />
              </div>
              <h2 className="text-3xl font-bold">Educational Videos</h2>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {videoResources.map((video, index) => (
                <Card
                  key={index}
                  className="group overflow-hidden border-2 hover:border-primary transition-all duration-300 hover:shadow-medium"
                >
                  <div className="p-6 space-y-4">
                    <div className="p-4 rounded-full bg-gradient-to-br from-primary/10 to-secondary/10 w-fit">
                      {React.createElement(video.icon, { className: "h-8 w-8 text-primary" })}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">{video.title}</h3>
                      <p className="text-sm text-muted-foreground">{video.description}</p>
                    </div>
                    <Button 
                      onClick={() => handleVideoClick(video)}
                      className="w-full bg-gradient-to-r from-primary to-secondary"
                    >
                      {video.platform === 'youtube' && <Youtube className="h-4 w-4 mr-2" />}
                      {video.platform === 'tiktok' && <TikTok className="h-4 w-4 mr-2" />}
                      {video.platform === 'instagram' && <Instagram className="h-4 w-4 mr-2" />}
                      Watch Video
                    </Button>
                </div>
              </Card>
              ))}
            </div>
          </div>

          {/* Website Resources */}
          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 rounded-full bg-gradient-to-br from-primary to-secondary">
                <ExternalLink className="h-6 w-6 text-primary-foreground" />
              </div>
              <h2 className="text-3xl font-bold">Helpful Websites</h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              {websites.map((site, index) => (
                <Card
                  key={index}
                  className="group border-2 hover:border-primary transition-all duration-300 hover:shadow-medium"
                >
                  <div className="p-6 space-y-4">
                    <div>
                      <h3 className="text-xl font-semibold mb-2">{site.name}</h3>
                      <p className="text-muted-foreground">{site.description}</p>
                    </div>
                    <Button 
                      onClick={() => handleWebsiteClick(site)}
                      variant="outline" 
                      className="w-full border-2 hover:border-primary transition-all duration-300"
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Visit Website
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Disclaimer */}
          <Card className="mt-16 p-6 border-2 border-primary/20 bg-primary/5">
            <p className="text-sm text-muted-foreground text-center">
              <strong>Disclaimer:</strong> The resources provided are for educational purposes only. 
              Always consult with your healthcare provider for personalized medical advice and care during pregnancy.
            </p>
          </Card>

          {/* API Fetched Articles Section */}
          <div className="mt-16">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 rounded-full bg-gradient-to-br from-primary to-secondary">
                <BookOpen className="h-6 w-6 text-primary-foreground" />
              </div>
              <h2 className="text-3xl font-bold">More Relevant Articles</h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {apiArticles.length > 0 ? (
                apiArticles.map((article) => (
                  <Card key={article._id} className="group border-2 hover:border-primary transition-all duration-300 hover:shadow-medium">
                    <div className="p-6 space-y-4">
                      <div>
                        <h3 className="text-xl font-semibold mb-2">{article.title}</h3>
                        <p className="text-muted-foreground text-sm mb-4">{article.content}</p>
                      </div>
                      <Button
                        onClick={() => window.open(article.url || '#', '_blank')}
                        variant="outline"
                        className="w-full border-2 hover:border-primary transition-all duration-300"
                      >
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Read More
                      </Button>
                    </div>
                  </Card>
                ))
              ) : (
                <p className="text-center col-span-full text-muted-foreground">No additional articles found or failed to load.</p>
              )}
            </div>
          </div>

        </div>
      </section>

      <Footer />

      {currentVideo && (
        <VideoModal
          isOpen={isVideoModalOpen}
          onClose={handleVideoModalClose}
          videoUrl={currentVideo.url}
          platform={currentVideo.platform}
        />
      )}
      {currentWebsite && (
        <WebsiteModal
          isOpen={isWebsiteModalOpen}
          onClose={handleWebsiteModalClose}
          websiteUrl={currentWebsite.url}
          websiteName={currentWebsite.name}
        />
      )}
      {currentArticle && (
        <ArticleDisplay
          isOpen={isArticleModalOpen}
          onClose={handleArticleModalClose}
          title={currentArticle.title}
          content={currentArticle.content}
        />
      )}
    </div>
  );
};

export default Resources;