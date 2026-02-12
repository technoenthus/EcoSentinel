import { useState } from 'react';
import { BookOpen, Play, ExternalLink, ChevronRight, Globe, TreeDeciduous, Droplets, Wind, Flame, CloudRain } from 'lucide-react';
import { Button } from '@/components/ui/button';

const videos = [
  {
    id: 1,
    title: 'Climate Change Explained',
    description: 'Understanding the science behind global warming and its effects on our planet.',
    youtubeId: 'oJAbATJCugs',
    category: 'climate',
    duration: '4:38',
  },
  {
    id: 2,
    title: 'Deforestation: Causes and Effects',
    description: 'How forest loss impacts biodiversity, climate, and human communities.',
    youtubeId: 'Ic-J6hcSKa8',
    category: 'deforestation',
    duration: '5:21',
  },
  {
    id: 3,
    title: 'Air Pollution: Health Impacts',
    description: 'The hidden dangers of air pollution and how it affects human health.',
    youtubeId: 'e6rglsLy1Ys',
    category: 'pollution',
    duration: '4:12',
  },
  {
    id: 4,
    title: 'Rising Sea Levels',
    description: 'How melting ice and thermal expansion threaten coastal communities.',
    youtubeId: 'VbiRNT_gWUQ',
    category: 'water',
    duration: '6:03',
  },
  {
    id: 5,
    title: 'Wildfires and Climate',
    description: 'Understanding the connection between climate change and increasing wildfires.',
    youtubeId: 'u_4NswxlGDE',
    category: 'disasters',
    duration: '51:56',
  },
  {
    id: 6,
    title: 'Flooding: Causes and Prevention',
    description: 'Why floods are becoming more severe and what we can do about it.',
    youtubeId: '4PXj7bOD7IY',
    category: 'disasters',
    duration: '4:55',
  },
];

const categories = [
  { id: 'all', label: 'All Topics', icon: BookOpen },
  { id: 'climate', label: 'Climate Change', icon: Globe },
  { id: 'deforestation', label: 'Deforestation', icon: TreeDeciduous },
  { id: 'pollution', label: 'Air Pollution', icon: Wind },
  { id: 'water', label: 'Water & Oceans', icon: Droplets },
  { id: 'disasters', label: 'Natural Disasters', icon: Flame },
];

const articles = [
  {
    title: 'Understanding the Carbon Cycle',
    description: 'How carbon moves through Earth\'s systems and why it matters for climate.',
    readTime: '8 min read',
    link: 'https://climate.nasa.gov/climate_resources/23/carbon-cycle/',
  },
  {
    title: 'The Amazon Rainforest: Earth\'s Lungs',
    description: 'Why protecting the Amazon is critical for global climate stability.',
    readTime: '6 min read',
    link: 'https://www.worldwildlife.org/places/amazon',
  },
  {
    title: 'Ocean Acidification Explained',
    description: 'How CO2 absorption is changing ocean chemistry and marine life.',
    readTime: '7 min read',
    link: 'https://www.noaa.gov/education/resource-collections/ocean-coasts/ocean-acidification',
  },
  {
    title: 'Satellite Technology for Earth Observation',
    description: 'How satellites help us monitor environmental changes from space.',
    readTime: '10 min read',
    link: 'https://earthdata.nasa.gov/',
  },
];

const LearnPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [playingVideo, setPlayingVideo] = useState<number | null>(null);

  const filteredVideos = selectedCategory === 'all' 
    ? videos 
    : videos.filter(v => v.category === selectedCategory);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-2 glass-card rounded-full mb-4">
          <BookOpen className="w-4 h-4 text-accent" />
          <span className="text-sm text-muted-foreground">Educational Resources</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground">
          Learn About Our Planet
        </h1>
        <p className="text-muted-foreground mt-2 max-w-2xl">
          Understand the environmental challenges facing our world and how technology 
          helps us monitor and protect Earth's ecosystems.
        </p>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
              selectedCategory === cat.id
                ? 'bg-primary/20 text-primary border border-primary'
                : 'bg-secondary/50 text-muted-foreground hover:bg-secondary'
            }`}
          >
            <cat.icon className="w-4 h-4" />
            <span className="text-sm font-medium">{cat.label}</span>
          </button>
        ))}
      </div>

      {/* Video Grid */}
      <div className="mb-16">
        <h2 className="text-2xl font-display font-bold text-foreground mb-6">
          Video Library
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVideos.map((video) => (
            <div key={video.id} className="glass-card rounded-2xl overflow-hidden group">
              <div className="relative aspect-video">
                {playingVideo === video.id ? (
                  <iframe
                    src={`https://www.youtube.com/embed/${video.youtubeId}?autoplay=1`}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  <>
                    <img
                      src={`https://img.youtube.com/vi/${video.youtubeId}/maxresdefault.jpg`}
                      alt={video.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-background/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => setPlayingVideo(video.id)}
                        className="w-16 h-16 rounded-full bg-primary flex items-center justify-center hover:scale-110 transition-transform"
                      >
                        <Play className="w-8 h-8 text-primary-foreground ml-1" />
                      </button>
                    </div>
                    <div className="absolute bottom-2 right-2 px-2 py-1 bg-background/80 rounded text-xs text-foreground">
                      {video.duration}
                    </div>
                  </>
                )}
              </div>
              <div className="p-4">
                <h3 className="font-display font-semibold text-foreground mb-2">{video.title}</h3>
                <p className="text-sm text-muted-foreground">{video.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Articles Section */}
      <div className="mb-16">
        <h2 className="text-2xl font-display font-bold text-foreground mb-6">
          Recommended Reading
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {articles.map((article, index) => (
            <a
              key={index}
              href={article.link}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-card p-6 rounded-2xl hover:scale-[1.02] transition-all group"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-display font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-3">{article.description}</p>
                  <span className="text-xs text-primary">{article.readTime}</span>
                </div>
                <ExternalLink className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" />
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Key Facts */}
      <div className="glass-card p-8 rounded-2xl">
        <h2 className="text-2xl font-display font-bold text-foreground mb-6">
          Key Environmental Facts
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-4xl font-display font-bold text-destructive mb-2">1.1°C</div>
            <p className="text-sm text-muted-foreground">Global temperature rise since pre-industrial era</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-display font-bold text-success mb-2">10M</div>
            <p className="text-sm text-muted-foreground">Hectares of forest lost annually</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-display font-bold text-primary mb-2">3.4mm</div>
            <p className="text-sm text-muted-foreground">Sea level rise per year</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-display font-bold text-warning mb-2">7M</div>
            <p className="text-sm text-muted-foreground">Premature deaths from air pollution yearly</p>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="mt-16 text-center">
        <h2 className="text-2xl font-display font-bold text-foreground mb-4">
          Take Action Today
        </h2>
        <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
          Use EcoSentinel to monitor environmental changes in real-time and make informed decisions to protect our planet.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a href="/dashboard">
            <Button variant="cosmic" size="lg" className="gap-2">
              <span>Open Dashboard</span>
              <ChevronRight className="w-5 h-5" />
            </Button>
          </a>
          <a href="/ai-assistant">
            <Button variant="outline" size="lg" className="gap-2">
              <span>Ask AI Assistant</span>
              <ChevronRight className="w-5 h-5" />
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default LearnPage;
