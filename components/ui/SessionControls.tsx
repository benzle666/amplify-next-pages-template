import { Button } from "@/components/ui/button"
import { Play, RedoDot, CircleQuestionMark } from "lucide-react"


type Props = {
    onStart: () => void
    onNext: () => void
    onStop: () => void
    onSettings: () => void
    active: boolean
}

export default function SessionControls({
    onStart,
    onNext,
    onStop,
    onSettings,
    active,
}: Props) {

return (
    <div className="flex justify-center mt-6 mb-6">
      <div className="h-14 bg-white border border-gray-200 rounded-full shadow-sm flex items-center justify-between">
        {/* Settings Button */}
        <div className="flex h-full justify-center items-center w-20">
            <Button
                variant="ghost"
                size="icon"
                onClick={onSettings}
                className="text-gray-400 hover:text-gray-600"
            >
                <div className="flex flex-col items-center">
                    <CircleQuestionMark />
                    <p className="text-xs mt-1">Guide</p>
                </div>
            </Button>
        </div>

        {/* Start / Next Button */}
        <div className="relative flex h-full justify-center items-center w-20">
            <div className="absolute left-1/2 -translate-x-1/2 z-10">
                <Button
                    onClick={active ? onNext : onStart}
                    className="bg-orange-400 hover:bg-orange-500 text-white w-16 h-16 rounded-full flex items-center justify-center shadow-md"
                >
                    {active ? (
                        <div className="flex flex-col items-center">
                            <RedoDot />
                            <p className="text-xs mt-1">Next</p>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center">
                            <Play fill="white"/>
                            <p className="text-xs mt-1">Start</p>
                        </div>
                    )}
                </Button>
            </div>
        </div>

        {/* End Button */}
        <div className="flex h-full justify-center items-center w-20">
            <Button
                variant="ghost"
                onClick={onStop}
                disabled={!active}
                className="text-gray-400 hover:text-gray-600"
            >
                <div className="flex flex-col items-center">
                    {active ? (
                        <div className="w-3 h-3 mt-1 bg-red-500 hover:bg-red-600"></div>
                    ) : (
                        <div className="w-3 h-3 mt-1 bg-red-200"></div>
                    )}
                    <p className="text-xs mt-1">End</p>
                </div>
            </Button>
        </div>
      </div>
    </div>

  )
}
