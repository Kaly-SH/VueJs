import axios from 'axios'

export async function getAllArtworks() {
  console.log(import.meta.env.API_BASE_URL)
	const response = await axios.get(import.meta.env.API_BASE_URL + '/artworks')
  console.log(response.data)
  return response.data;
}
