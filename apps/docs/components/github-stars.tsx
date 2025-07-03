"use client"
import useSWR from 'swr'

const fetcher = (url: string) => fetch(url).then(res => res.json())

export function GithubStars({ repo }: { repo: string }) {
  const { data, error } = useSWR<{ stargazers_count: number }>(
    `https://api.github.com/repos/${repo}`,
    fetcher,
    { refreshInterval: 60000 }
  )

  if (error) return null
  if (!data) return <span className="ml-2 text-xs text-muted-foreground">...</span>

  return (
    <span className="ml-2 text-xs text-yellow-500 font-semibold tabular-nums">
      ★ {data.stargazers_count.toLocaleString()}
    </span>
  )
}
