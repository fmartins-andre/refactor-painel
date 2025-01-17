'use client'

import { type ReactNode } from 'react'
import { getBrandDetails } from '@/utils/get-brand-details'
import * as Portal from '@radix-ui/react-portal'
import { motion } from 'framer-motion'

import { cn } from '@/lib/utils'

const brand = getBrandDetails()

const RootStyle = ({ children }: { children: ReactNode }) => {
  return (
    <Portal.Root className="fixed z-[60]">
      <div
        className={cn(
          'bg-dark/80 fixed inset-0 z-50 flex size-full items-center justify-center'
        )}
      >
        {children}
      </div>
    </Portal.Root>
  )
}

export default function Loading() {
  return (
    <RootStyle>
      <motion.div
        animate={{
          opacity: [1, 0.48, 0.48, 1, 1],
          scale: [1, 0.9, 0.9, 1, 1],
        }}
        transition={{
          duration: 2,
          ease: 'easeInOut',
          repeat: Infinity,
          repeatDelay: 1,
        }}
      >
        <img
          alt={`${brand.name} logo`}
          height={49}
          src={brand.logoPath.collapsed}
          width={49}
        ></img>
      </motion.div>
      <motion.div
        animate={{
          borderRadius: ['25%', '25%', '50%', '50%', '25%'],
          opacity: [0.25, 1, 1, 1, 0.25],
          rotate: [270, 0, 0, 270, 270],
          scale: [1.2, 1, 1, 1.2, 1.2],
        }}
        className="dark:border-secondary border-primary-lighter absolute size-[100px] rounded-[25%] border-[3px]"
        transition={{ duration: 3.2, ease: 'linear', repeat: Infinity }}
      />
      <motion.div
        animate={{
          borderRadius: ['25%', '25%', '50%', '50%', '25%'],
          opacity: [1, 0.25, 0.25, 0.25, 1],
          rotate: [0, 270, 270, 0, 0],
          scale: [1, 1.2, 1.2, 1, 1],
        }}
        className="dark:border-secondary border-primary-lighter absolute size-[120px] rounded-[25%] border-8"
        transition={{
          duration: 3.2,
          ease: 'linear',
          repeat: Infinity,
        }}
      />
    </RootStyle>
  )
}
