import { useState, useRef, useEffect } from 'react';
import { Bot, Send, User, Sparkles, Globe, TreeDeciduous, Wind, Droplets, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

// Mock AI responses based on keywords
const generateMockResponse = (query: string): string => {
  const lowerQuery = query.toLowerCase();
  
  if (lowerQuery.includes('earthquake') || lowerQuery.includes('seismic')) {
    return `Based on current USGS data, I can provide insights on earthquake activity:

**Recent Seismic Activity:**
- In the past 24 hours, there have been numerous earthquakes recorded globally
- Most significant activity tends to occur along tectonic plate boundaries
- The Pacific Ring of Fire remains the most seismically active region

**Key Insights:**
- Earthquakes magnitude 4.0+ are considered significant
- Deep earthquakes (>70km) typically cause less surface damage
- Tsunami warnings are issued for large undersea earthquakes

Would you like me to explain more about earthquake monitoring or specific regions?`;
  }
  
  if (lowerQuery.includes('pollution') || lowerQuery.includes('air quality') || lowerQuery.includes('pm2.5')) {
    return `I can help you understand air pollution data:

**Current Global Air Quality:**
- PM2.5 levels vary significantly by region
- Industrial areas and major cities often have elevated readings
- Weather patterns greatly influence pollution dispersion

**Health Guidelines (PM2.5):**
- 0-12 μg/m³: Good - Safe for all groups
- 12-35 μg/m³: Moderate - Acceptable for most people
- 35-55 μg/m³: Unhealthy for Sensitive Groups
- 55-150 μg/m³: Unhealthy - Everyone may experience effects
- >150 μg/m³: Very Unhealthy to Hazardous

**Sources of Air Pollution:**
1. Vehicle emissions
2. Industrial processes
3. Power generation
4. Agricultural activities
5. Natural sources (dust, wildfires)

Would you like specific information about a region?`;
  }
  
  if (lowerQuery.includes('deforestation') || lowerQuery.includes('forest')) {
    return `Here's what we know about global deforestation:

**Current Situation:**
- Approximately 10 million hectares of forest are lost annually
- Primary drivers include agriculture, logging, and urbanization
- The Amazon, Congo Basin, and Southeast Asia are major hotspots

**Why It Matters:**
- Forests absorb ~2.6 billion tonnes of CO2 annually
- They're home to 80% of terrestrial biodiversity
- Over 1.6 billion people depend on forests for their livelihoods

**Positive Trends:**
- Global deforestation rates have decreased 9% since 2020
- Reforestation efforts are growing
- Satellite monitoring enables faster response

**How You Can Help:**
- Support sustainable products
- Reduce paper consumption
- Donate to conservation organizations

Would you like to learn more about specific regions or conservation efforts?`;
  }
  
  if (lowerQuery.includes('sea level') || lowerQuery.includes('ocean') || lowerQuery.includes('water')) {
    return `Let me share insights on water-related environmental data:

**Sea Level Rise:**
- Current rate: ~3.4mm per year
- Since 1993, sea levels have risen about 100mm
- Acceleration is occurring due to ice sheet melting

**Primary Causes:**
1. Thermal expansion of warming oceans (40%)
2. Melting glaciers and ice caps (30%)
3. Greenland ice sheet loss (20%)
4. Antarctic ice sheet loss (10%)

**Impact on Communities:**
- 680 million people live in low-lying coastal zones
- Many island nations face existential threats
- Coastal flooding is becoming more frequent

**Water Scarcity:**
- 2.3 billion people live in water-stressed countries
- Major lakes like Lake Chad have shrunk dramatically
- Climate change is intensifying drought cycles

Is there a specific water body or region you'd like to know more about?`;
  }
  
  if (lowerQuery.includes('climate change') || lowerQuery.includes('global warming')) {
    return `Climate change is one of the most pressing issues we monitor:

**Current State:**
- Global temperature has risen ~1.1°C since pre-industrial era
- The last decade was the warmest on record
- CO2 levels are at 421 ppm (highest in 800,000 years)

**Observed Impacts:**
1. More frequent extreme weather events
2. Shifting ecosystems and species ranges
3. Rising sea levels and ocean acidification
4. Melting ice sheets and glaciers
5. Changes in precipitation patterns

**EcoSentinel's Role:**
We use satellite data and AI to monitor:
- Real-time temperature anomalies
- Forest cover changes
- Air quality patterns
- Water level fluctuations

Would you like specific data on any of these indicators?`;
  }
  
  // Default response
  return `I'm EcoSentinel's AI environmental assistant. I can help you understand:

🌍 **Climate & Weather**
- Global temperature trends
- Extreme weather patterns

🌳 **Deforestation**
- Forest cover monitoring
- Conservation efforts

💨 **Air Quality**
- Pollution levels worldwide
- Health guidelines

🌊 **Water Resources**
- Sea level changes
- Freshwater monitoring

🌋 **Natural Disasters**
- Earthquake activity
- Tsunami warnings

**Try asking about:**
- "What's the current earthquake activity?"
- "How bad is air pollution globally?"
- "Tell me about deforestation in the Amazon"
- "How fast are sea levels rising?"

How can I help you understand our planet better?`;
};

const suggestedQuestions = [
  { icon: Globe, text: "What's causing climate change?" },
  { icon: Wind, text: "How bad is air pollution today?" },
  { icon: TreeDeciduous, text: "Where is deforestation happening?" },
  { icon: Droplets, text: "How fast are sea levels rising?" },
];

const AIAssistantPage = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: "Hello! I'm EcoSentinel's AI environmental assistant. I can help you understand environmental data, climate science, and the current state of our planet. What would you like to know?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (text?: string) => {
    const messageText = text || input.trim();
    if (!messageText) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: messageText,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate AI thinking delay
    await new Promise((resolve) => setTimeout(resolve, 1000 + Math.random() * 1000));

    // Generate mock response
    const response = generateMockResponse(messageText);
    
    const assistantMessage: Message = {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: response,
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, assistantMessage]);
    setIsTyping(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const clearChat = () => {
    setMessages([
      {
        id: '1',
        role: 'assistant',
        content: "Chat cleared. How can I help you understand our planet today?",
        timestamp: new Date(),
      },
    ]);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-4 py-2 glass-card rounded-full mb-4">
            <Bot className="w-4 h-4 text-accent animate-pulse" />
            <span className="text-sm text-muted-foreground">AI Environmental Assistant</span>
          </div>
          <h1 className="text-3xl font-display font-bold text-foreground">
            Ask EcoSentinel
          </h1>
          <p className="text-muted-foreground mt-1">
            Get answers about environmental data and climate science
          </p>
        </div>
        <Button variant="outline" size="sm" onClick={clearChat} className="gap-2">
          <RefreshCw className="w-4 h-4" />
          Clear Chat
        </Button>
      </div>

      {/* Chat Container */}
      <div className="glass-card rounded-2xl overflow-hidden flex flex-col h-[600px]">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-4 ${message.role === 'user' ? 'flex-row-reverse' : ''}`}
            >
              <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                message.role === 'assistant' 
                  ? 'bg-primary/20' 
                  : 'bg-secondary'
              }`}>
                {message.role === 'assistant' ? (
                  <Bot className="w-5 h-5 text-primary" />
                ) : (
                  <User className="w-5 h-5 text-muted-foreground" />
                )}
              </div>
              <div className={`flex-1 max-w-[80%] ${message.role === 'user' ? 'text-right' : ''}`}>
                <div className={`inline-block p-4 rounded-2xl ${
                  message.role === 'assistant'
                    ? 'bg-secondary/50 text-foreground'
                    : 'bg-primary text-primary-foreground'
                }`}>
                  <div className="whitespace-pre-wrap text-sm">{message.content}</div>
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  {message.timestamp.toLocaleTimeString()}
                </div>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                <Bot className="w-5 h-5 text-primary" />
              </div>
              <div className="bg-secondary/50 p-4 rounded-2xl">
                <div className="flex gap-1">
                  <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Suggested Questions */}
        {messages.length <= 2 && (
          <div className="px-6 pb-4">
            <p className="text-xs text-muted-foreground mb-2">Suggested questions:</p>
            <div className="flex flex-wrap gap-2">
              {suggestedQuestions.map((q, index) => (
                <button
                  key={index}
                  onClick={() => handleSend(q.text)}
                  className="flex items-center gap-2 px-3 py-2 bg-secondary/50 rounded-lg hover:bg-secondary transition-colors text-sm text-foreground"
                >
                  <q.icon className="w-4 h-4 text-primary" />
                  {q.text}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input */}
        <div className="border-t border-border/50 p-4">
          <div className="flex gap-3">
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask about earthquakes, air quality, deforestation, sea levels..."
              className="flex-1 resize-none bg-secondary/30 border-border/50 min-h-[50px] max-h-[150px]"
              rows={1}
            />
            <Button 
              variant="cosmic" 
              size="lg" 
              onClick={() => handleSend()}
              disabled={!input.trim() || isTyping}
              className="px-6"
            >
              <Send className="w-5 h-5" />
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-2 text-center">
            <Sparkles className="w-3 h-3 inline mr-1" />
            AI-Generated Insight (Simulated) • Based on real environmental data patterns
          </p>
        </div>
      </div>

      {/* Disclaimer */}
      <p className="text-xs text-muted-foreground mt-4 text-center">
        This AI assistant provides educational information based on environmental data patterns. 
        For critical decisions, always consult official sources like USGS, NOAA, or NASA.
      </p>
    </div>
  );
};

export default AIAssistantPage;
