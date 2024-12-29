import { SandpackProvider } from '@codesandbox/sandpack-react'
import SandPack from './test-sandpack'

export const Default = () => (
  <SandpackProvider template="react">
    <SandPack />
  </SandpackProvider>
)
