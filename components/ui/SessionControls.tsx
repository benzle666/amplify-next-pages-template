import { Button } from "@/components/ui/button"
import { Play, SkipForward, CircleQuestionMark, SkipBack, GraduationCap } from "lucide-react"


type Props = {
    onStart: () => void
    onNext: () => void
    onStop: () => void
    onSettings: () => void
    onRepeat: () => void
    onAssess: () => void
    active: boolean
    isLoading: boolean
}

export default function SessionControls({
    onStart,
    onNext,
    onStop,
    onSettings,
    onRepeat,
    onAssess,
    active,
    isLoading
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
                className="text-gray-600 hover:text-black cursor-pointer"
            >
                <div className="flex flex-col items-center">
                    <CircleQuestionMark />
                    <p className="text-xs mt-1">Guide</p>
                </div>
            </Button>
        </div>

        {/* Back Button */}
        <div className="flex h-full justify-center items-center w-20">
            <Button
                variant="ghost"
                size="icon"
                onClick={onRepeat}
                className="text-gray-600 hover:text-black cursor-pointer"
            >
                <div className="flex flex-col items-center">
                    <SkipBack />
                    <p className="text-xs mt-1">Repeat</p>
                </div>
            </Button>
        </div>

        {/* Start / Next Button */}
        <div className="relative flex h-full justify-center items-center w-20">
            <div className="absolute left-1/2 -translate-x-1/2 z-10">
                <Button
                    onClick={active ? onNext : onStart}
                    className="bg-orange-400 hover:bg-orange-500 text-white w-16 h-16 rounded-full flex items-center justify-center shadow-md cursor-pointer disabled:cursor-wait"
                    disabled={isLoading}
                >
                    {active ? (
                        <div className="flex flex-col items-center">
                            <SkipForward />
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

        {/* Assess Button */}
        <div className="flex h-full justify-center items-center w-20">
            <Button
                variant="ghost"
                onClick={onAssess}
                disabled={!active}
                className="text-gray-600 hover:text-black cursor-pointer"
            >
                <div className="flex flex-col items-center">
                    {active ? (
                        <GraduationCap />
                    ) : (
                        <GraduationCap />
                    )}
                    <p className="text-xs mt-1">Assess</p>
                </div>
            </Button>
        </div>
        
        {/* End Button */}
        <div className="flex h-full justify-center items-center w-20">
            <Button
                variant="ghost"
                onClick={onStop}
                disabled={!active}
                className="text-gray-600 hover:text-black cursor-pointer"
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
