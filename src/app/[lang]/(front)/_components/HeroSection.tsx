"use client";

import FrontContainer from "@/presentation/components/FrontContainer";
import Image from "next/image";
import Link from "next/link";
import { Button } from "primereact/button";
import { Carousel } from "primereact/carousel";

const translations = {
  hero: {
    title: "Discover the world of Cubix",
    description: "Explore our collection of unique and innovative products",
    shopButton: "Shop Now",
  },
};

const carouselItems = [
  {
    id: 1,
    alt: "Puzzle challenge",
    url: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&auto=format",
  },
  {
    id: 2,
    alt: "Brain teaser",
    url: "https://images.unsplash.com/photo-1605106702734-205df224ecce?w=800&auto=format",
  },
  {
    id: 3,
    alt: "Educational toy",
    url: "https://images.unsplash.com/photo-1594787319144-04b35b4939c3?w=800&auto=format",
  },
  {
    id: 4,
    alt: "Family fun game",
    url: "https://images.unsplash.com/photo-1578269174936-2709b6aeb913?w=800&auto=format",
  },
];

const HeroSection = () => {
  return (
    <section className="bg-surface-ground">
      <FrontContainer>
        <div className="flex-column align-items-center flex w-full md:flex-row">
          <HeroContent />
          <HeroCarousel items={carouselItems} />
        </div>
      </FrontContainer>
    </section>
  );
};

const HeroContent = () => (
  <div className="flex-column align-items-start flex w-full p-5 md:w-6">
    <h1 className="mb-3 text-4xl md:text-6xl">{translations.hero.title}</h1>
    <p className="line-height-3 max-w-30rem mb-5 text-lg">
      {translations.hero.description}
    </p>
    <Link href="/shop" passHref>
      <Button label={translations.hero.shopButton} className="p-button-lg" />
    </Link>
  </div>
);

const HeroCarousel = ({ items }: { items: typeof carouselItems }) => (
  <div className="w-full md:w-6">
    <Carousel
      value={items}
      numVisible={1}
      numScroll={1}
      itemTemplate={CarouselItem}
      circular
      autoplayInterval={5000}
    />
  </div>
);

const CarouselItem = (item: (typeof carouselItems)[0]) => (
  <div className="border-round-xl overflow-hidden">
    <Image
      src={item.url}
      alt={item.alt}
      className="border-round-xl w-full"
      width={400}
      height={400}
      objectFit="cover"
    />
  </div>
);

export default HeroSection;
