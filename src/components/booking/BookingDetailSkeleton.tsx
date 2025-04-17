
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const BookingDetailSkeleton = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-20 py-12">
        <div className="container mx-auto px-4">
          <Button 
            variant="ghost" 
            className="mb-6" 
            onClick={() => navigate('/dashboard')}
            disabled
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar para o dashboard
          </Button>
          
          <Card className="max-w-3xl mx-auto">
            <CardHeader className="border-b">
              <div className="flex justify-between items-center">
                <Skeleton className="h-8 w-48" />
                <Skeleton className="h-6 w-24 rounded-full" />
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <Skeleton className="h-7 w-48 mb-4" />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Array(4).fill(0).map((_, i) => (
                      <div key={i} className="flex items-start">
                        <Skeleton className="h-5 w-5 mr-3 mt-0.5 rounded-full" />
                        <div className="w-full">
                          <Skeleton className="h-4 w-24 mb-2" />
                          <Skeleton className="h-5 w-32" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <Skeleton className="h-7 w-40 mb-3" />
                  <div className="border rounded-md">
                    {Array(3).fill(0).map((_, i) => (
                      <div key={i} className={`${i < 2 ? 'border-b' : ''} px-4 py-3 flex justify-between`}>
                        <Skeleton className="h-5 w-16" />
                        <Skeleton className="h-5 w-20" />
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <Skeleton className="h-7 w-48 mb-3" />
                  <div className="flex items-start">
                    <Skeleton className="h-5 w-5 mr-3 mt-0.5 rounded-full" />
                    <div>
                      <Skeleton className="h-4 w-32 mb-2" />
                      <Skeleton className="h-5 w-24" />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BookingDetailSkeleton;
