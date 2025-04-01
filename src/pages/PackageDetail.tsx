
import { useParams, Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactCTA from "@/components/ContactCTA";
import PackageDetailHero from "@/components/package/PackageDetailHero";
import PackageDetailTabs from "@/components/package/PackageDetailTabs";
import PackageDetailSidebar from "@/components/package/PackageDetailSidebar";
import { Button } from "@/components/ui/button";
import { usePackageDetail } from "@/hooks/usePackageDetail";

const PackageDetail = () => {
  const { id } = useParams();
  const { packageData, isLoading, isInWishlist, handleWishlistToggle } = usePackageDetail(id);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse">Carregando...</div>
      </div>
    );
  }

  if (!packageData) {
    return (
      <div className="min-h-screen pt-20">
        <Header />
        <div className="container mx-auto px-4 py-12 text-center">
          <h1 className="text-2xl font-bold mb-4">Pacote não encontrado</h1>
          <p className="mb-6">O pacote que você está procurando não existe.</p>
          <Link to="/pacotes">
            <Button className="bg-tuca-ocean-blue">Ver todos os pacotes</Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-16">
        {/* Hero Section */}
        <PackageDetailHero packageData={packageData} />

        {/* Content Section */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2">
                <PackageDetailTabs packageData={packageData} />
              </div>
              
              {/* Sidebar */}
              <div className="lg:col-span-1">
                <PackageDetailSidebar 
                  packageData={packageData} 
                  isInWishlist={isInWishlist}
                  onWishlistToggle={handleWishlistToggle}
                />
              </div>
            </div>
          </div>
        </section>

        <ContactCTA />
      </main>
      <Footer />
    </div>
  );
};

export default PackageDetail;
