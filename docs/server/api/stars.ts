export default defineEventHandler(async (event) => {
  const cachedStars = await useStorage("kv").getItem<string>("tempo-stars")
  let [lastAccessed, totalStars] = cachedStars ? cachedStars.split("|") : [0, 0]

  if (Date.now() - Number(lastAccessed) > 1000 * 60) {
    const res = await fetch("https://api.github.com/repos/formkit/tempo")
    if (res.ok) {
      const data = (await res.json()) as { stargazers_count: number }
      await useStorage("kv").setItem(
        "tempo-stars",
        `${data.stargazers_count}|${Date.now()}`
      )
      return { stars: data.stargazers_count }
    }
  }
  return { stars: totalStars }
})
