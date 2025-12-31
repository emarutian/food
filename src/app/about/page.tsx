import Link from "next/link";
import { ChefHat, Heart, Globe, Users, Clock, Leaf, PiggyBank, Youtube, ArrowRight, GraduationCap } from "lucide-react";
import { NewsletterForm } from "@/components/ui/NewsletterForm";

export default function AboutPage() {
  return (
    <div className="min-h-screen py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="font-accent text-xl text-terracotta mb-2">Meet Lan</p>
          <h1 className="font-heading text-4xl lg:text-5xl font-bold text-charcoal">
            I Have Food at Home
          </h1>
        </div>

        {/* Hero Image */}
        <div className="relative aspect-[21/9] rounded-2xl overflow-hidden mb-16">
          <img
            src="https://images.unsplash.com/photo-1507048331197-7d4ac70811cf?w=1200&q=80"
            alt="Family cooking together in kitchen"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 to-transparent" />
          <div className="absolute bottom-8 left-8 right-8">
            <p className="font-accent text-3xl text-white">
              &ldquo;Turning mealtime chaos into joyful moments&rdquo;
            </p>
          </div>
        </div>

        {/* Meet Lan Section */}
        <div className="flex flex-col md:flex-row items-start gap-8 mb-16">
          <div className="w-48 h-48 rounded-full overflow-hidden flex-shrink-0 border-4 border-terracotta mx-auto md:mx-0">
            <img
              src="/lan-picture.jpg"
              alt="Lan - I Have Food at Home"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-2">
              <ChefHat className="h-5 w-5 text-terracotta" />
              <span className="text-sm text-terracotta font-medium">The Chef Behind It All</span>
            </div>
            <h2 className="font-heading text-2xl font-semibold text-charcoal mb-4">
              Hi, I&apos;m Lan
            </h2>
            <p className="text-charcoal-light mb-4">
              Born and raised in France with Vietnamese roots. Before becoming a mom,
              I worked in the corporate world and ran a dessert-focused catering business.
              Along the way, I trained at <strong>Ecole Lenôtre</strong>, the <strong>Art Institute</strong>,
              and the <strong>French Pastry School</strong>.
            </p>
            <p className="text-charcoal-light mb-4">
              Today, I teach elementary school children how to cook—and more importantly,
              how to <em>enjoy</em> every kind of food.
            </p>
            <p className="text-charcoal-light font-medium">
              My mission is to help busy parents turn mealtime chaos into joyful,
              shared moments around the table.
            </p>
          </div>
        </div>

        {/* Recipe Philosophy */}
        <div className="bg-parchment-dark rounded-2xl p-8 lg:p-12 mb-16">
          <h2 className="font-heading text-2xl font-semibold text-charcoal text-center mb-8">
            My Recipes Are...
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-14 h-14 bg-terracotta/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <Clock className="h-7 w-7 text-terracotta" />
              </div>
              <h3 className="font-heading text-lg font-semibold text-charcoal">
                Simple
              </h3>
              <p className="text-charcoal-light text-sm mt-1">
                Easy to follow, no fuss
              </p>
            </div>
            <div className="text-center">
              <div className="w-14 h-14 bg-sage/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <Leaf className="h-7 w-7 text-sage" />
              </div>
              <h3 className="font-heading text-lg font-semibold text-charcoal">
                Healthy
              </h3>
              <p className="text-charcoal-light text-sm mt-1">
                Nutritious & balanced
              </p>
            </div>
            <div className="text-center">
              <div className="w-14 h-14 bg-honey/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <PiggyBank className="h-7 w-7 text-honey-dark" />
              </div>
              <h3 className="font-heading text-lg font-semibold text-charcoal">
                Budget-Friendly
              </h3>
              <p className="text-charcoal-light text-sm mt-1">
                Affordable ingredients
              </p>
            </div>
            <div className="text-center">
              <div className="w-14 h-14 bg-terracotta/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <Globe className="h-7 w-7 text-terracotta" />
              </div>
              <h3 className="font-heading text-lg font-semibold text-charcoal">
                Globally Inspired
              </h3>
              <p className="text-charcoal-light text-sm mt-1">
                French, Vietnamese & more
              </p>
            </div>
          </div>
        </div>

        {/* Story Section */}
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="font-heading text-2xl font-semibold text-charcoal mb-4">
              For Picky Eaters
            </h2>
            <div className="space-y-4 text-charcoal-light">
              <p>
                Everyone—yes, even the pickiest eaters—will find something to love here.
              </p>
              <p>
                With my culinary background and experience teaching toddlers, kids, and adults,
                I share practical tips and techniques so you can cook quickly and confidently.
              </p>
              <p>
                From batch cooking to smart freezing methods, I&apos;ll show you how to stay
                organized and always ready for last-minute meals.
              </p>
            </div>
          </div>
          <div>
            <h2 className="font-heading text-2xl font-semibold text-charcoal mb-4">
              My Background
            </h2>
            <div className="space-y-4 text-charcoal-light">
              <div className="flex items-start gap-3">
                <GraduationCap className="h-5 w-5 text-terracotta mt-1 flex-shrink-0" />
                <p><strong>Ecole Lenôtre</strong> — French culinary excellence</p>
              </div>
              <div className="flex items-start gap-3">
                <GraduationCap className="h-5 w-5 text-terracotta mt-1 flex-shrink-0" />
                <p><strong>The Art Institute</strong> — Culinary arts training</p>
              </div>
              <div className="flex items-start gap-3">
                <GraduationCap className="h-5 w-5 text-terracotta mt-1 flex-shrink-0" />
                <p><strong>French Pastry School</strong> — Pastry & dessert expertise</p>
              </div>
              <div className="flex items-start gap-3">
                <Users className="h-5 w-5 text-sage mt-1 flex-shrink-0" />
                <p><strong>Dessert Catering Business</strong> — Owner & operator</p>
              </div>
              <div className="flex items-start gap-3">
                <Heart className="h-5 w-5 text-honey-dark mt-1 flex-shrink-0" />
                <p><strong>Elementary School</strong> — Teaching kids to cook & love food</p>
              </div>
            </div>
          </div>
        </div>

        {/* YouTube Stats */}
        <div className="bg-charcoal rounded-2xl p-8 lg:p-12 mb-16 text-center">
          <a
            href="https://www.youtube.com/@Ihavefoodathome"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mb-6 text-white hover:text-terracotta transition-colors"
          >
            <Youtube className="h-8 w-8" />
            <span className="font-heading text-2xl font-semibold">@Ihavefoodathome</span>
          </a>
          <div className="grid grid-cols-3 gap-8 max-w-lg mx-auto">
            <div>
              <p className="font-heading text-3xl font-bold text-terracotta">860+</p>
              <p className="text-parchment/70 text-sm">Subscribers</p>
            </div>
            <div>
              <p className="font-heading text-3xl font-bold text-terracotta">36</p>
              <p className="text-parchment/70 text-sm">Videos</p>
            </div>
            <div>
              <p className="font-heading text-3xl font-bold text-terracotta">59K+</p>
              <p className="text-parchment/70 text-sm">Views</p>
            </div>
          </div>
          <a
            href="https://www.youtube.com/@Ihavefoodathome"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 bg-terracotta hover:bg-terracotta-dark text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            <Youtube className="h-5 w-5" />
            Subscribe on YouTube
          </a>
        </div>

        {/* Newsletter CTA */}
        <div className="bg-sage/10 rounded-2xl p-8 lg:p-12 text-center">
          <p className="font-accent text-xl text-terracotta mb-2">Join the family</p>
          <h2 className="font-heading text-2xl font-semibold text-charcoal mb-4">
            Never Miss a Recipe
          </h2>
          <p className="text-charcoal-light mb-8 max-w-md mx-auto">
            Subscribe to get new recipes delivered straight to your inbox.
            Simple, healthy, and kid-approved meals every week.
          </p>
          <div className="flex justify-center mb-6">
            <NewsletterForm />
          </div>
          <Link
            href="/recipes"
            className="text-terracotta font-medium inline-flex items-center gap-1 hover:gap-2 transition-all"
          >
            Or start browsing recipes <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
