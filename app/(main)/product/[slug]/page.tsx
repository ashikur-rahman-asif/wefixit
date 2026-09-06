import Container from "@/components/container";
import { calculateDiscountPercentage } from "@/lib/utils";
import { Product } from "@/types/product";
import { ProductActions } from "../_components/product-actions";
import { ProductColorSelector } from "../_components/product-color-selector";
import { ProductImageGallery } from "../_components/product-image-gallery";
import { ProductInfo } from "../_components/product-info";
import { ProductQuantitySelector } from "../_components/product-quantity-selector";
import { ProductDescription } from "../_components/product-description";
import { ProductSpecifications } from "../_components/product-specifications";
import { ProductReviews } from "../_components/product-reviews";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

export default async function ProductDetailsPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;
  const productSlug = params.slug;

  const product: Product = {
    id: 1,
    title:
      "ASUS X509JB Core I5 10th Gen NVIDIA MX110 Graphics 15.6 Inch FHD Laptop",
    slug: productSlug,
    image: "/HP_Lptp.webp",
    images: [
      "/HP_Lptp.webp",
      "/HP_Lptp.webp",
      "/HP_Lptp.webp",
      "/HP_Lptp.webp",
    ],
    price: 456,
    discountPrice: 356,
    shortDescription: "ASUS X509 is a entry-level laptop that delivers powerful performance and immersive visuals. Its NanoEdge display boasts wide 178° viewing angles and a matte anti-glare coating for a truly engaging experience.",
    specification: `
      <table>
        <tbody>
          <tr>
            <td>Brand</td>
            <td>ASUS</td>
          </tr>
          <tr>
            <td>Model</td>
            <td>X509JB</td>
          </tr>
          <tr>
            <td>Processor</td>
            <td>Intel Core i5-1035G1 Processor (6M Cache, 1.00 GHz up to 3.60 GHz)</td>
          </tr>
          <tr>
            <td>Display</td>
            <td>15.6 Inch FHD (1920x1080) Anti-Glare, 60Hz, 45% NTSC</td>
          </tr>
          <tr>
            <td>Memory</td>
            <td>8GB DDR4 RAM</td>
          </tr>
          <tr>
            <td>Storage</td>
            <td>512GB PCIe Gen3 x2 SSD</td>
          </tr>
          <tr>
            <td>Graphics</td>
            <td>NVIDIA GeForce MX110 with 2GB GDDR5 VRAM</td>
          </tr>
          <tr>
            <td>Operating System</td>
            <td>Windows 10 Home (Upgradable to Windows 11)</td>
          </tr>
          <tr>
            <td>Battery</td>
            <td>2-Cell 32 Wh Lithium-Polymer Battery</td>
          </tr>
          <tr>
            <td>Weight</td>
            <td>1.90 kg (4.19 lbs)</td>
          </tr>
          <tr>
            <td>Ports</td>
            <td>1x USB 3.2 Gen 1 Type-C, 1x USB 3.2 Gen 1 Type-A, 2x USB 2.0, 1x HDMI 1.4, 1x Audio Jack</td>
          </tr>
          <tr>
            <td>Connectivity</td>
            <td>Wi-Fi 5 (802.11ac) + Bluetooth 4.1</td>
          </tr>
        </tbody>
      </table>
    `,
    description: `
      <h2>Experience The Ultimate Performance</h2>
      <p>ASUS X509JB is a vast screen area for an immersive viewing experience for work and play. It has a wide-view FHD panel that features an anti-glare coating to reduce unwanted distractions from irritating glare and reflections, so you can truly focus on what's in front of you.</p>

      <h2>Key Features</h2>
      <ul>
        <li><strong>Powerful Processor:</strong> Up to 10th Gen Intel Core i5 processor.</li>
        <li><strong>Stunning Visuals:</strong> 15.6-inch Full HD (1920x1080) anti-glare display.</li>
        <li><strong>Dedicated Graphics:</strong> NVIDIA MX110 for smooth performance in games and design software.</li>
        <li><strong>Ample Storage:</strong> Fast PCIe SSD for lightning-fast boot and app loading times.</li>
      </ul>

      <h2>Designed for Your Workflow</h2>
      <p>Whether for work or play, ASUS X509 is the entry-level laptop that delivers powerful performance and immersive visuals. Its NanoEdge display boasts wide 178° viewing angles and a matte anti-glare coating for a truly engaging experience.</p>

      <blockquote>"The ASUS X509 delivers an exceptional balance of performance and affordability, making it an ideal choice for everyday users and students."</blockquote>
    `,
    rating: 4.7,
    reviewsCount: 20,
    stock: 10,
    colors: [
      { id: 1, name: "red", hex: "#991b1b" },
      { id: 2, name: "yellow", hex: "#eab308" },
      { id: 3, name: "green", hex: "#166534" },
      { id: 4, name: "purple", hex: "#6b21a8" },
      { id: 5, name: "black", hex: "#000000" },
    ],
  };

  const discountPercentage = calculateDiscountPercentage(
    product.price,
    product.discountPrice,
  );

  return (
    <Container className="py-6 md:py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-14">
        <div className="md:sticky md:top-24 md:self-start z-10">
          <ProductImageGallery
            images={product.images || [product.image]}
            discountPercentage={discountPercentage}
          />
        </div>
        <div>
          <ProductInfo product={product} />
          <ProductColorSelector colors={product.colors} />
          {(!product.stock || product.stock > 0) && <ProductQuantitySelector />}
          <ProductActions isOutOfStock={product.stock === 0} />
        </div>
      </div>
      <Tabs defaultValue="description" className="mt-12">
        <TabsList className="flex h-auto items-center justify-start gap-5 bg-transparent p-0">
          <TabsTrigger
            value="description"
            className="text-[20px] font-medium text-secondary bg-transparent p-0 shadow-none data-[state=active]:shadow-none data-[state=active]:bg-transparent data-[state=active]:text-brand data-[state=active]:underline data-[state=active]:underline-offset-8 data-active:shadow-none data-active:bg-transparent data-active:text-brand data-active:underline data-active:underline-offset-8 hover:text-brand dark:hover:text-brand cursor-pointer"
          >
            Description
          </TabsTrigger>
          <TabsTrigger
            value="specifications"
            className="text-[20px] font-medium text-secondary bg-transparent p-0 shadow-none data-[state=active]:shadow-none data-[state=active]:bg-transparent data-[state=active]:text-brand data-[state=active]:underline data-[state=active]:underline-offset-8 data-active:shadow-none data-active:bg-transparent data-active:text-brand data-active:underline data-active:underline-offset-8 hover:text-brand dark:hover:text-brand cursor-pointer"
          >
            Specifications
          </TabsTrigger>
          <TabsTrigger
            value="reviews"
            className="text-[20px] font-medium text-secondary bg-transparent p-0 shadow-none data-[state=active]:shadow-none data-[state=active]:bg-transparent data-[state=active]:text-brand data-[state=active]:underline data-[state=active]:underline-offset-8 data-active:shadow-none data-active:bg-transparent data-active:text-brand data-active:underline data-active:underline-offset-8 hover:text-brand dark:hover:text-brand cursor-pointer"
          >
            Reviews
          </TabsTrigger>
        </TabsList>
        <TabsContent value="description">
          <ProductDescription product={product} />
        </TabsContent>
        <TabsContent value="specifications">
          <ProductSpecifications product={product} />
        </TabsContent>
        <TabsContent value="reviews">
          <ProductReviews product={product} />
        </TabsContent>
      </Tabs>
    </Container>
  );
}
