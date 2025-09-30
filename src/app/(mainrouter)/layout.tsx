import Footer from "@/components/homeComponents/NavbarAndFooter/Footer";
import Navbar from "@/components/homeComponents/NavbarAndFooter/Navbar";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Profile } from "@/types/profile/profile";

const HomeLayout = async ({ children }: { children: React.ReactNode }) => {
  const token = (await cookies()).get("FFT")?.value;
  let profileData: Profile | null = null;
  if (token) {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/my-profile`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.status === 401 || response.status === 403) {
        redirect("/logout");
      }
      if (response.ok) {
        profileData = await response.json();
      }
    } catch (error) {
      console.error('Error fetching profile data:', error);
      redirect("/logout");
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br to-[#2B304C]/70 from-[#2B304C]/10">
      <Navbar profileData={profileData} />
      <main className="flex-1">
        <div className="md:mt-16 mt-18" />
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default HomeLayout;




// "description": "<!-- Paste this whole block into your HTML-capable editor -->\r\n<article class=\"ff-card\" aria-labelledby=\"ff-title\"><header>\r\n<h2 id=\"ff-title\">How to Order Free Fire Diamonds? কিভাবে ফ্রি ফায়ার ডায়মন্ড অর্ডার করবেন?</h2>\r\n<div class=\"meta\">💎 Simple steps &bull; Fast delivery &bull; Multiple Bangladeshi payment options</div>\r\n</header><!-- Responsive YouTube embed (paste your video's ID below) -->\r\n<div class=\"video-wrapper\" aria-hidden=\"false\"><iframe title=\"How to Order Free Fire Diamonds\" src=\"https://www.youtube.com/embed/9Hz2K-wP0cI\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen=\"allowfullscreen\">\r\n    </iframe></div>\r\n<section>\r\n<h3>Description:</h3>\r\n<p>💎 TOP UP করতে প্রথমে Diamond 💎 select করুন। তারপর order করুন। Order পেজ এ আপনি Player ID বসানোর option পাবেন। সেখানে আপনার Player ID টি দিন। এরপর সব অপশন পুরণ করে পেমেন্ট কমপ্লিট করুন। পেমেন্ট কমপ্লিট করার জন্য কোনো ফি নেওয়া হয় না। Order complete হওয়ার ২&ndash;১০ মিনিটের মধ্যে আপনার account এ Diamond চলে যাবে।</p>\r\n<p>Free Fire Diamond helps you get weapons, pets, skins, membership benefits, and a chance at Luck Royale / Diamond Spin &mdash; redeem the code and enjoy!</p>\r\n<h3>How to top up Free Fire Diamond?</h3>\r\n<ol>\r\n<li>Select the Diamond denomination.</li>\r\n<li>Select quantity and click <strong>Buy Now</strong>.</li>\r\n<li>Enter name, Email, Phone number, and your <strong>Free Fire Player ID</strong> (make sure it is correct).</li>\r\n<li>Checkout and select your payment method.</li>\r\n<li>Once payment is made, purchased Diamonds will be credited to your Free Fire Account shortly.</li>\r\n</ol>\r\n<h3>Free Fire diamond topup Buying Steps:</h3>\r\n<ul>\r\n<li><strong>Only Player ID</strong> is needed for top-up.</li>\r\n<li>Stay logged in during the transaction. After completion, diamonds will be added to your Garena FF account.</li>\r\n<li>Enter Player ID correctly to avoid delays.</li>\r\n</ul>\r\n<h3>How to find Free Fire Player ID?</h3>\r\n<ol>\r\n<li>Open the game and log in.</li>\r\n<li>Tap your avatar (top-left).</li>\r\n<li>Your Free Fire Player ID will be displayed there.</li>\r\n</ol>\r\n<img class=\"responsive\" src=\"https://vertexbazaar.com/wp-content/uploads/2021/01/freefire-product-guide1.jpg\" alt=\"Free Fire guide image\" width=\"600\" height=\"338\">\r\n<p><strong>Bdgamesbazar.com</strong> prepaid card also available at low price.</p>\r\n<h3>What is Free Fire Diamond?</h3>\r\n<p>Diamonds are the premium currency in <strong>Garena-Free Fire</strong>, letting you buy cosmetic items, try Luck Royale, and buy Elite Pass.</p>\r\n<h3>How to Get Free Fire Elite Pass?</h3>\r\n<p>Top up diamonds &rarr; open the Elite Pass banner in-game &rarr; click <em>Upgrade</em> &rarr; confirm.</p>\r\n<h3>Free Fire Diamond Top-Up BD :</h3>\r\n<p>Buy diamonds instantly using many payment options (bKash, Nagad, Rocket, Upay). Redeem the digital voucher code to get Diamonds &mdash; no Play Store/App Store needed.</p>\r\n<h3>How do I get Diamonds?</h3>\r\n<ul>\r\n<li>Buy directly in-game.</li>\r\n<li>Exchange FF Tokens or use Garena vouchers.</li>\r\n<li>Purchase from trusted voucher sellers for convenience.</li>\r\n</ul>\r\n<h3>Why you should top up Diamonds?</h3>\r\n<ol>\r\n<li><strong>Unlock exclusive items</strong> &mdash; skins, characters, and more.</li>\r\n<li><strong>Customize your experience</strong> with unique cosmetics.</li>\r\n<li><strong>Boost gameplay</strong> with powerful items.</li>\r\n<li><strong>Try your luck</strong> with Luck Royale.</li>\r\n<li><strong>Save time</strong> &mdash; instantly obtain items instead of grinding.</li>\r\n<li><strong>Join Elite Pass</strong> for extra rewards.</li>\r\n</ol>\r\n<h3>Get Ready for an Unforgettable Free Fire Experience From Trusted shop</h3>\r\n<p>At Vertex Bazaar, we provide a secure and quick top-up process with multiple Bangladeshi payment options. Receive diamonds quickly and play without delay.</p>\r\n<p><strong>Other Free Fire Products:</strong> <a class=\"cta\" href=\"https://vertexbazaar.com/product-category/free-fire\">Click Here</a></p>\r\n<h3>FF Download Links</h3>\r\n<ul>\r\n<li>Android: <a href=\"https://play.google.com/store/apps/details?id=com.dts.freefireth&amp;hl=en&amp;gl=US\">Download</a></li>\r\n<li>iOS: <a href=\"https://apps.apple.com/us/app/free-fire/id1300146617\">Download</a></li>\r\n</ul>\r\n<p><em>Note:</em> Vertex Bazaar is not an official Garena partner; we source from trusted voucher suppliers (e.g., UniPin). Always buy from reputable sellers to avoid issues.</p>\r\n</section>\r\n<footer style=\"margin-top: 14px; font-size: 0.95rem; color: color-mix(in srgb, currentcolor 70%, black 30%);\"><strong>People also search for:</strong> free fire diamond, diamond top up bd bkash, free fire low price, buy free fire diamond, FF top up bangladesh.</footer></article>",