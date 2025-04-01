
import { Link } from "react-router-dom";
import { Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";

// Sample Instagram posts
const instagramPosts = [
  {
    id: 1,
    image: "/instagram-1.jpg",
    link: "https://instagram.com/tucanoronha",
    likes: 256,
  },
  {
    id: 2,
    image: "/instagram-2.jpg",
    link: "https://instagram.com/tucanoronha",
    likes: 189,
  },
  {
    id: 3,
    image: "/instagram-3.jpg",
    link: "https://instagram.com/tucanoronha",
    likes: 432,
  },
  {
    id: 4,
    image: "/instagram-4.jpg",
    link: "https://instagram.com/tucanoronha",
    likes: 327,
  },
  {
    id: 5,
    image: "/instagram-5.jpg",
    link: "https://instagram.com/tucanoronha",
    likes: 215,
  },
  {
    id: 6,
    image: "/instagram-6.jpg",
    link: "https://instagram.com/tucanoronha",
    likes: 198,
  },
];

const InstagramFeed = () => {
  return (
    <section className="py-12 bg-gradient-to-r from-tuca-light-blue to-tuca-light-green">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-serif font-bold mb-2">
              Nos Siga no Instagram
            </h2>
            <p className="text-gray-700">
              @tucanoronha | @agenciatucanoronha | @fernandodenoronha
            </p>
          </div>
          <a
            href="https://instagram.com/tucanoronha"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 md:mt-0"
          >
            <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white">
              <Instagram className="h-5 w-5 mr-2" />
              Seguir
            </Button>
          </a>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 md:gap-4">
          {instagramPosts.map((post) => (
            <a
              key={post.id}
              href={post.link}
              target="_blank"
              rel="noopener noreferrer"
              className="block relative group overflow-hidden aspect-square rounded-md"
            >
              <img
                src={post.image}
                alt="Instagram post"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center p-3">
                <div className="flex items-center text-white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 mr-1"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-sm">{post.likes}</span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InstagramFeed;
