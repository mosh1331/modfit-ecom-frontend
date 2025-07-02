export function getBaseCloudinaryUrl(url: string): string | null {
    const match = url.match(/^(.*\/product_\d+)/);
    return match ? match[1] : null;
  }

  