export const homeSlides = [
    {
      id: 1,
      title: "Build AI Products Faster",
      description: "Launch AI chatbots & voice agents in weeks",
      image: "/assets/hero1.jpg",
      cta: "Get Started"
    },
    {
      id: 2,
      title: "AI Voice Agents",
      description: "Automate calls, support & sales with AI",
      image: "/assets/hero2.jpg",
      cta: "Explore"
    },
    {
      id: 3,
      title: "Enterprise Automation",
      description: "Connect CRM, WhatsApp, Slack & more",
      image: "/assets/hero1.jpg",
      cta: "See Solutions"
    }
]

export interface slide{
  id:number,
  title:string,
  description:string,
  image:string,
  cta:string
}