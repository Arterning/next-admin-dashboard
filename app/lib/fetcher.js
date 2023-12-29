
const fetcher = async (url, options) => {
    const response = await fetch(url, options);
    if (!response.ok) {
      console.error(response)
    }
    return await response.json();
  }
  

export default fetcher;
