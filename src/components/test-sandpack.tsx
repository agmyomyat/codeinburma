import {
  SandpackProvider,
  SandpackLayout,
  SandpackCodeEditor,
  SandpackPreview,
  useSandpackConsole,
  useTranspiledCode,
} from '@codesandbox/sandpack-react'
import { useEffect } from 'react'

export default function SandPack() {
  const { logs } = useSandpackConsole({ resetOnPreviewRestart: true })
  useEffect(() => {
    console.log(logs)
  }, [logs])
  return (
    <SandpackLayout>
      <SandpackCodeEditor showInlineErrors />
      <SandpackPreview showOpenInCodeSandbox={false} />
    </SandpackLayout>
  )
}
