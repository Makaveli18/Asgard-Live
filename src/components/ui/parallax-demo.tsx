import { ParallaxScrollSecond } from "./parallax-scroll";

const images = [
  "https://images.unsplash.com/photo-1554080353-a576cf803bda?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1505144808419-1957a94ca61e?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1554080353-a576cf803bda?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1505144808419-1957a94ca61e?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1682686581854-5e71f58e7e3f?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1510784722466-f2aa9c52fff6?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1505765050516-f72dcac9c60e?auto=format&fit=crop&w=800&q=80"
];

export function ParallaxScrollSecondDemo() {
  return <ParallaxScrollSecond images={images} />;
}