/**
 * @description getMatches
 */
export async function getMatches() {
    try {
        const response = await fetch('/api/match');
        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }
        // get data
        const data = await response.json();
        return data;
      } catch (error) {
        console.error(error);
      }
}