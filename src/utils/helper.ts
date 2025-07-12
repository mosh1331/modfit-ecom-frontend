export function getBaseCloudinaryUrl(url: string): string | null {
    const match = url.match(/^(.*\/product_[^/]+)/i);
    return match ? match[1] : null;
  }
  
  // utils/loadRazorpay.ts
export const loadRazorpay = () => {
  return new Promise((resolve) => {
    const script = document.createElement("script")
    script.src = "https://checkout.razorpay.com/v1/checkout.js"
    script.onload = () => resolve(true)
    script.onerror = () => resolve(false)
    document.body.appendChild(script)
  })
}
