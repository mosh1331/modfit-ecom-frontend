export function getBaseCloudinaryUrl(url: string): string | null {
    const match = url.match(/^(.*\/product_[^/]+)/i);
    return match ? match[1] : null;
  }
  
  