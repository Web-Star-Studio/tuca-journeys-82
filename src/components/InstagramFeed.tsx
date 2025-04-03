
import React from "react";
import { Instagram, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import SafeImage from "@/components/ui/safe-image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const InstagramFeed = () => {
  const instagramProfiles = [
    {
      handle: "@tucanoronha",
      description: "Nosso perfil principal com todas as novidades e promoções",
      url: "https://instagram.com/tucanoronha",
    },
    {
      handle: "@agenciatucanoronha",
      description: "Conheça os bastidores da nossa agência e nossa equipe",
      url: "https://instagram.com/agenciatucanoronha",
    },
    {
      handle: "@fernandodenoronha",
      description: "Imagens deslumbrantes e informações sobre a ilha",
      url: "https://instagram.com/fernandodenoronha",
    },
  ];

  const instagramPosts = [
    { id: 1, image: "/instagram-1.jpg" },
    { id: 2, image: "/instagram-2.jpg" },
    { id: 3, image: "/instagram-3.jpg" },
    { id: 4, image: "/instagram-4.jpg" },
    { id: 5, image: "/instagram-5.jpg" },
    { id: 6, image: "/instagram-6.jpg" },
  ];

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center justify-center mb-4">
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-3 rounded-full">
              <Instagram className="h-8 w-8 text-white" />
            </div>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-medium mb-4">
            Nos Siga no Instagram
          </h2>
          
          <p className="text-gray-600 text-lg mb-0 max-w-2xl mx-auto">
            Acompanhe nossas aventuras, dicas exclusivas e momentos inesquecíveis
          </p>
        </motion.div>
        
        {/* Instagram Posts Grid - Desktop */}
        <motion.div 
          className="hidden md:grid grid-cols-6 gap-4 mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {instagramPosts.map((post, index) => (
            <motion.div 
              key={post.id}
              className="relative overflow-hidden rounded-xl aspect-square group"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              viewport={{ once: true }}
            >
              <SafeImage
                src={post.image}
                alt={`Instagram post ${post.id}`}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center p-4">
                <Instagram className="text-white h-6 w-6" />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Instagram Posts Carousel - Mobile */}
        <div className="md:hidden mb-12">
          <Carousel className="w-full">
            <CarouselContent>
              {instagramPosts.map((post) => (
                <CarouselItem key={post.id} className="basis-4/5">
                  <div className="relative overflow-hidden rounded-xl aspect-square">
                    <SafeImage
                      src={post.image}
                      alt={`Instagram post ${post.id}`}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent flex items-end justify-center p-4">
                      <Instagram className="text-white h-5 w-5" />
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-2" />
            <CarouselNext className="right-2" />
          </Carousel>
        </div>
        
        {/* Instagram Profiles */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {instagramProfiles.map((profile, index) => (
            <motion.div 
              key={profile.handle}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all p-6 border border-gray-100"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              viewport={{ once: true }}
            >
              <h3 className="font-medium text-xl mb-2 bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
                {profile.handle}
              </h3>
              <p className="text-gray-600 mb-4 h-12">
                {profile.description}
              </p>
              <a
                href={profile.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block"
              >
                <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white">
                  <Instagram className="h-5 w-5 mr-2" />
                  Seguir
                  <ExternalLink className="h-4 w-4 ml-2" />
                </Button>
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InstagramFeed;
