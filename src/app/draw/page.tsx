'use client'

import { SetStateAction, useEffect, useState } from 'react'
import { useDraw } from '@/app/hooks/useDraw'
import { ChromePicker } from 'react-color'

import { drawLine } from '@/app/utils/drawLine'

export default function Draw() {
  const [color, setColor] = useState<string>('#000')
  const { canvasRef, onMouseDown, clear } = useDraw(createLine)

  useEffect(() => {
    const ctx = canvasRef.current?.getContext('2d')

  }, [canvasRef])

  function createLine({ prevPoint, currentPoint, ctx }: any) {
    drawLine({ prevPoint, currentPoint, ctx, color })
  }

  return (
    <div className='w-screen h-screen bg-white flex justify-center items-center'>
      <div className='flex flex-col gap-10 pr-10'>
        <ChromePicker color={color} onChange={(e: { hex: SetStateAction<string> }) => setColor(e.hex)} />
        {/* <button
          type='button'
          className='p-2 rounded-md border border-black'
          onClick={() => socket.emit('clear')}>
          Clear canvas
        </button> */}
      </div>
      <canvas
        ref={canvasRef}
        onMouseDown={onMouseDown}
        width={950}
        height={950}
        className='border border-black rounded-md'
      />
    </div>
  )
}