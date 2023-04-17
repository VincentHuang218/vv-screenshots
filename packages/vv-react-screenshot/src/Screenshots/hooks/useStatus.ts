import { useCallback } from 'react'
import useDispatcher from './useDispatcher'
import useStore from './useStore'

export interface BoundsDispatcher {
  set: (status: number) => void
  reset: () => void
}

export type BoundsValueDispatcher = [number, BoundsDispatcher]

export default function useStatus (): BoundsValueDispatcher {
  const { status } = useStore()
  const { setStatus } = useDispatcher()

  const set = useCallback(
    status => {
      setStatus?.(status)
    },
    [setStatus]
  )

  const reset = useCallback(() => {
    setStatus?.(0)
  }, [setStatus])

  return [
    status,
    {
      set,
      reset
    }
  ]
}
