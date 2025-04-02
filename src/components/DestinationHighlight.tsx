import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, MapPin, Camera, Umbrella, Fish } from "lucide-react";
const DestinationHighlight = () => {
  // Animation variants for staggered effect
  const containerVariants = {
    hidden: {
      opacity: 0
    },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.2
      }
    }
  };
  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 20
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };
  return <section className="py-24 lg:py-32 bg-gradient-to-r from-tuca-light-blue to-white overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          {/* Left content */}
          <motion.div className="lg:w-1/2" initial={{
          opacity: 0,
          x: -50
        }} whileInView={{
          opacity: 1,
          x: 0
        }} transition={{
          duration: 0.8
        }} viewport={{
          once: true,
          margin: "-100px"
        }}>
            <h2 className="text-4xl md:text-5xl font-medium tracking-tight mb-6">
              Conheça o Paraíso Brasileiro
            </h2>
            <p className="text-lg text-muted-foreground mb-10 leading-relaxed">
              Fernando de Noronha é um arquipélago vulcânico situado a 354 km da costa do estado de Pernambuco. 
              Com águas cristalinas, biodiversidade marinha exuberante e praias deslumbrantes, o local é 
              considerado Patrimônio Natural da Humanidade pela UNESCO.
            </p>
            
            <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{
            once: true
          }} className="grid grid-cols-2 gap-6 mb-10">
              <motion.div variants={itemVariants} className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-tuca-ocean-blue/10 flex items-center justify-center">
                  <MapPin className="h-6 w-6 text-tuca-ocean-blue" />
                </div>
                <div>
                  <h3 className="font-medium text-lg">21 Praias</h3>
                  <p className="text-sm text-muted-foreground">Cada uma com sua beleza única</p>
                </div>
              </motion.div>
              
              <motion.div variants={itemVariants} className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-tuca-ocean-blue/10 flex items-center justify-center">
                  <Camera className="h-6 w-6 text-tuca-ocean-blue" />
                </div>
                <div>
                  <h3 className="font-medium text-lg">10+ Mirantes</h3>
                  <p className="text-sm text-muted-foreground">Vistas panorâmicas incríveis</p>
                </div>
              </motion.div>
              
              <motion.div variants={itemVariants} className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-tuca-ocean-blue/10 flex items-center justify-center">
                  <Umbrella className="h-6 w-6 text-tuca-ocean-blue" />
                </div>
                <div>
                  <h3 className="font-medium text-lg">Clima Perfeito</h3>
                  <p className="text-sm text-muted-foreground">Temperatura média de 28°C</p>
                </div>
              </motion.div>
              
              <motion.div variants={itemVariants} className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-tuca-ocean-blue/10 flex items-center justify-center">
                  <Fish className="h-6 w-6 text-tuca-ocean-blue" />
                </div>
                <div>
                  <h3 className="font-medium text-lg">Vida Marinha</h3>
                  <p className="text-sm text-muted-foreground">Golfinhos, tartarugas e mais</p>
                </div>
              </motion.div>
            </motion.div>
            
            <motion.div initial={{
            opacity: 0,
            y: 20
          }} whileInView={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.6,
            delay: 0.6
          }} viewport={{
            once: true
          }}>
              <Link to="/sobre">
                <Button className="rounded-full px-8 py-6 bg-tuca-ocean-blue hover:bg-tuca-deep-blue text-white transition-all duration-300 group" size="lg">
                  <span className="font-medium">Descubra Mais</span>
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </motion.div>
          </motion.div>
          
          {/* Right image grid with enhanced animation */}
          <motion.div className="lg:w-1/2" initial={{
          opacity: 0,
          x: 50
        }} whileInView={{
          opacity: 1,
          x: 0
        }} transition={{
          duration: 0.8,
          delay: 0.2
        }} viewport={{
          once: true,
          margin: "-100px"
        }}>
            <div className="grid grid-cols-12 grid-rows-6 gap-4 h-[550px]">
              <motion.div className="col-span-7 row-span-6 rounded-2xl overflow-hidden shadow-xl" whileHover={{
              scale: 1.02
            }} transition={{
              duration: 0.4
            }}>
                <img alt="Praia de Noronha" className="w-full h-full object-cover" src="/lovable-uploads/1ed8fc0e-6277-4755-8c6e-88af20896e06.png" />
              </motion.div>
              <motion.div className="col-span-5 row-span-3 rounded-2xl overflow-hidden shadow-xl" whileHover={{
              scale: 1.04
            }} transition={{
              duration: 0.4
            }}>
                <img alt="Pôr do sol em Noronha" className="w-full h-full object-cover" src="/lovable-uploads/fa98842d-11c7-407f-80d4-096d976437d9.png" />
              </motion.div>
              <motion.div className="col-span-5 row-span-3 rounded-2xl overflow-hidden shadow-xl" whileHover={{
              scale: 1.04
            }} transition={{
              duration: 0.4
            }}>
                <img src="/hero-noronha-aerial.jpg" alt="Vista aérea de Noronha" className="w-full h-full object-cover" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>;
};
export default DestinationHighlight;