import { create } from 'zustand'

interface UseDashBoardProps {
  filterDasMeiFromStatus: string
  handleSetFilterDasMeiFromStatus: (status: string) => void
  filterCertificateFromStatus: string
  handleSetFilterCertificateFromStatus: (status: string) => void
}

export const useDashboard = create<UseDashBoardProps>((set) => ({
  filterDasMeiFromStatus: 'A Vencer',
  handleSetFilterDasMeiFromStatus: (status: string) =>
    set({ filterDasMeiFromStatus: status }),

  filterCertificateFromStatus: 'vencidos',
  handleSetFilterCertificateFromStatus: (status: string) =>
    set({ filterCertificateFromStatus: status }),
}))
