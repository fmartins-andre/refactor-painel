import {
  StatusListaCertificadosVisaoGeralModelEnum,
  StatusListaDasMeiVisaoGeralModelEnum,
} from '@/services/api/accountant-panel-api/endpoints/visao-geral'
import { create } from 'zustand'

interface UseDashBoardProps {
  filterDasMeiFromStatus: StatusListaDasMeiVisaoGeralModelEnum
  handleSetFilterDasMeiFromStatus: (
    status: StatusListaDasMeiVisaoGeralModelEnum
  ) => void
  filterCertificateFromStatus: StatusListaCertificadosVisaoGeralModelEnum
  handleSetFilterCertificateFromStatus: (
    status: StatusListaCertificadosVisaoGeralModelEnum
  ) => void
}

export const useDashboard = create<UseDashBoardProps>((set) => ({
  filterDasMeiFromStatus:
    StatusListaDasMeiVisaoGeralModelEnum.PROXIMO_VENCIMENTO,
  handleSetFilterDasMeiFromStatus: (
    status: StatusListaDasMeiVisaoGeralModelEnum
  ) => set({ filterDasMeiFromStatus: status }),

  filterCertificateFromStatus:
    StatusListaCertificadosVisaoGeralModelEnum.VENCIDO,
  handleSetFilterCertificateFromStatus: (
    status: StatusListaCertificadosVisaoGeralModelEnum
  ) => set({ filterCertificateFromStatus: status }),
}))
