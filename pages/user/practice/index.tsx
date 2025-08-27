import { useState, ReactElement, useRef, useEffect } from "react";
import { generateClient } from "aws-amplify/data";
import { RealtimeAgent, RealtimeSession } from "@openai/agents/realtime";
import type { Schema } from "@/amplify/data/resource";
import type { NextPageWithLayout } from '@/pages/_app';
import { CasualAcademicPrompt, IELTSPrompt, IELTSUserMaterialPart2Prompt } from "@/services/prompts/realtimePrompts";
import Image from "next/image";
import Link from "next/link";

import MyAuth from '@/components/layout/MyAuth';
import Header from "@/components/layout/Header";

import Modal from "@/components/ui/Model";
import Selection from "@/components/ui/Selection";
import SessionControls from "@/components/ui/SessionControls";
import FlipCard from "@/components/ui/ContentHide";
import Timer, { TimerHandle } from "@/components/ui/Timer";
import LargeTimer from "@/components/ui/LargeTimer";
import Loader, { LoaderHandle } from "@/components/ui/Loader";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

import { Send } from 'lucide-react';
import EnergyIcon from "@/components/ui/Energy";

// EnergyState
type EnergyState = "charged" | "charging" | "claim" | "none";

// Options select
const formatOptions = [
  { label: "IELTS", value: "ielts" },
  { label: "Casual", value: "casual" },
]

const voiceOptions = [
  { label: "Alloy", value: "alloy" },
  { label: "Ash", value: "ash" },
  { label: "Ballad", value: "ballad" },
  { label: "Coral", value: "coral" },
  { label: "Echo", value: "echo" },
  { label: "Sage", value: "sage" },
  { label: "Shimmer", value: "shimmer" },
  { label: "Verse", value: "verse" },
]

const speedOptions = [
  { label: "Fast", value: "fast" },
  { label: "Normal", value: "normal" },
  { label: "Slow", value: "slow" },
]

// Emphemeral key
const client = generateClient<Schema>();

const getKey = async () => {
  return client.queries.getEmphemeral({ name: 'Amplify' })
    .then(apiResult => {
      if (apiResult.data) {
        return JSON.parse(apiResult.data)
      } else {
        console.error("No data in getKey apiResult");
      }
    })
    .catch(err => {
      console.error("Error fetching key:", err);
    });
}

const getContent = async (promptContent : string) => {
  return client.queries.getTestContent({ prompt: promptContent })
    .then(apiResult => {
      if (apiResult) {
        console.log(apiResult.data)
        return apiResult.data;
      } else {
        console.error("No data in getContent apiResult");
      }
    })
    .catch(err => {
      console.error("Error fetching:", err);
    });
}

// Realtime API
let session: RealtimeSession | null = null;

type sessionArg = {
  selectedFormat: string,
  generatedContent: string | null,
  selectedVoice: string, 
  selectedSpeed: string,
}

const getSession = async ({ selectedFormat, generatedContent, selectedVoice, selectedSpeed }: sessionArg) => {
  const data = await getKey();

  let agent: RealtimeAgent;
  let agentVoice: string;
  let agentSpeed: number;

  switch (selectedFormat) {
    case 'ielts':
      agent = new RealtimeAgent({
        name: 'IELTS Examiner',
        instructions: IELTSPrompt + generatedContent,
      });
      break;

    default:
      agent = new RealtimeAgent({
        name: 'Conversation Tutor',
        instructions: CasualAcademicPrompt,
      });
      break;
  }

  switch (selectedVoice) {
    case 'alloy':
      agentVoice = 'alloy';
      break;
    case 'ash':
      agentVoice = 'ash';
      break;
    case 'ballad':
      agentVoice = 'ballad';
      break;
    case 'coral':
      agentVoice = 'coral';
      break;
    case 'echo':
      agentVoice = 'echo';
      break;
    case 'sage':
      agentVoice = 'sage';
      break;
    case 'shimmer':
      agentVoice = 'shimmer';
      break;
    case 'verse':
      agentVoice = 'verse';
      break;
    default:
      agentVoice = 'alloy';
      break;
  }

  switch (selectedSpeed) {
    case 'fast':
      agentSpeed = 1.25;
      break;
    case 'normal':
      agentSpeed = 1;
      break;
    case 'slow':
      agentSpeed = 0.75;
      break;
    default:
      agentSpeed = 1;

  }

  session = new RealtimeSession(agent, {
    config: {
      speed: agentSpeed,
      voice: agentVoice,
    }
  });

  await session.connect({
    apiKey: data.client_secret?.value,
  });
};

const endSession = () => {
  if (session) {
    session.close();
    session = null;
  }
};

const PracticePage: NextPageWithLayout = () => {
  const [active, setActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false)
  const [isEnergyModalOpen, setEnergyModalOpen] = useState(false)
  const [selectedFormat, setSelectedFormat] = useState<string>("ielts")
  const [selectedVoice, setSelectedVoice] = useState<string>("alloy")
  const [selectedSpeed, setSelectedSpeed] = useState<string>("normal")
  const [inputValue, setInputValue] = useState<string>("")
  const [energyState, setEnergyState] = useState<EnergyState>("charging")
  const [userMaterial, setUserMaterial] = useState<string | null>(null);

  
  const inputRef = useRef<HTMLInputElement>(null);
  const timerRef = useRef<TimerHandle>(null)
  const loaderRef = useRef<LoaderHandle>(null);

  const triggerTimer = () => {
    timerRef.current?.start()
  }

  // 1. Autofocus when mounted
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // 2. Handle enter key
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputValue.trim()) {
      session?.sendMessage("The topic that I want to talk about is:" + inputValue);
    }
  };

  // 3. Refocus when user starts typing anywhere
  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;

      // Prevent hijacking typing inside another input/textarea
      if (target.tagName === "INPUT" || target.tagName === "TEXTAREA") return;

      if (inputRef.current) {
        inputRef.current.focus();
      }
    };

    window.addEventListener("keydown", handleKeydown);
    return () => window.removeEventListener("keydown", handleKeydown);
  }, []);

  const checkEnergy = async () => {
    // Will update energy state here
    
  }
  checkEnergy()
  
  const handleStart = async () => {
    loaderRef.current?.next();
    setIsLoading(true)
    const generatedContent = await getContent(IELTSUserMaterialPart2Prompt) ?? null;
    loaderRef.current?.next();

    console.log("Is examiner material loaded" + generatedContent)
    setUserMaterial(generatedContent)
    try {
      console.log("Start agent")
      await getSession({ selectedFormat, generatedContent, selectedVoice, selectedSpeed });
      loaderRef.current?.next();
    } catch (error) {
      console.log(error)
      setActive(false)
      setIsLoading(false)
      loaderRef.current?.reset();
      return;
    }
    setActive(true);
    triggerTimer()
    setIsLoading(false)
    loaderRef.current?.finish();
  };
  
  const handleStop = async () => {
    setUserMaterial(null)
    endSession();
    loaderRef.current?.reset();
    setActive(false);
  };

  return (
    <div className="flex flex-col h-screen">
      <Header>
        <div className="flex items-center px-2 hover:bg-yellow-200 cursor-pointer" onClick={() => setEnergyModalOpen(true)}>
          {
            (energyState === "charging") && (
              <div className="flex flex-col items-center text-black text-xs w-32">
                <div>Next energy in</div>
                <LargeTimer
                  initialSeconds={1000000}
                  onTimeUp={() => alert("Time's up!")}
                  formatUnits={["days", "hours", "minutes", "seconds"]}
                  autoStart
                />
              </div>
            )
          }
          {
            (energyState === "claim") && (
              <div className="px-4">
                Claim now
              </div>
            )
          }
          <EnergyIcon energyState={energyState} />
        </div>
        <Link className="px-2" href="/user/setting">Setting</Link>
      </Header>
        
        {/* Content that may overflow */}
        <div className="flex-1 overflow-y-auto h-100">
          {/* long content here will scroll if needed */}
          <div className="h-6"></div>
          <FlipCard title="My Book" opened={true}>
            <p>Well come to TalkAura</p>
          </FlipCard>
          <FlipCard title="My Book">
            <Image 
              src="/logo.png"
              width={500}
              height={500}
              alt="Content"
            />
          </FlipCard>
          {userMaterial && (
            <FlipCard title="My Book">
              <p>{userMaterial}</p>
            </FlipCard>
          )}
        </div>

        {/* Bottom controls */}
        <div className="flex flex-col items-center space-y-4">
          <div className="w-100 -mb-2">
            <Loader ref={loaderRef} stepSize={4}/>
          </div>
          {/* SelectBars */}
          <div className="w-100 flex justify-center mt-6">
            <div className="flex gap-4">
              <Selection
                label="Select Format"
                options={formatOptions}
                selected={selectedFormat}
                onChange={setSelectedFormat}
              />
              <div className="inline-flex flex-1 h-10 w-64 items-center justify-between rounded-full border border-gray-200 bg-white px-4 py-1.5 shadow-sm hover:bg-gray-50">
                <input
                ref={inputRef}
                  type="text"
                  placeholder="Topics...? (Random by default)"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  maxLength={50}
                  onKeyDown={handleKeyDown}
                  className="w-full bg-transparent text-sm font-medium text-gray-700 placeholder-gray-400 focus:outline-none"
                />
                <div 
                  className="flex items-center justify-center shrink-0 w-8 h-8 translate-x-3 border border-gray-200 rounded-full shadow-sm hover:bg-gray-50 text-gray-700 hover:text-black cursor-pointer" 
                  onClick={() => session?.sendMessage("The topic that I want to talk about is:" + inputValue)}
                >
                  <Send className="-translate-x-0.25 translate-y-0.5" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center space-y-4">
          {/* SessionControls */}
          <SessionControls
            onStart={handleStart}
            onNext={() => session?.sendMessage("I have finish talking, move on to the next question.")}
            onRepeat={() => session?.sendMessage("Sorry can you repeat the last question?")}
            onAssess={() => session?.sendMessage("Give me my score and my assessments.")}
            onStop={handleStop}
            onSettings={() => setModalOpen(true)}
            active={active}
            isLoading={isLoading}
          />
        </div>
        <div className="flex justify-center pb-6">

          <Timer
            ref={timerRef}
            initialSeconds={1740}
            onTimeUp={handleStop}
            visible={active}
          />
        </div>


        <Modal
          isOpen={isEnergyModalOpen}
          onClose={() => setEnergyModalOpen(false)}
          title="Preferences"
        >
          <p>Upgrade to Legendary to practice daily!</p>
          <Image src="/logo.png" width={500} height={500} alt="Advertisement portal" />
          <div className="flex justify-center bg-orange-500 text-white p-2 rounded-lg cursor-pointer hover:bg-orange-600 transition">
            Claim!
          </div>
        </Modal>

        <Modal
          isOpen={isModalOpen}
          onClose={() => setModalOpen(false)}
          title="Preferences"
        >
          <p>AI settings</p>
          <div className="w-full flex-col justify-center mt-6 mb-6">
            <div className="flex gap-4 items-center justify-between mb-6">
              <p>Voice</p>
              <Selection
                label="Select Voice"
                options={voiceOptions}
                selected={selectedVoice}
                onChange={setSelectedVoice}
              />
            </div>
            <div className="flex gap-4 items-center justify-between mb-6">
              <p>Speed</p>
              <Selection
                label="Select Speed"
                options={speedOptions}
                selected={selectedSpeed}
                onChange={setSelectedSpeed}
              />
            </div>
          </div>
          <p>Guides & support</p>
          <Accordion
            type="single"
            collapsible
            className="w-full"
            defaultValue="item-1"
          >
            <AccordionItem value="item-1">
              <AccordionTrigger>Control panels</AccordionTrigger>
              <AccordionContent className="flex flex-col gap-4 text-balance">
                <p>
                  Our flagship product combines cutting-edge technology with sleek
                  design. Built with premium materials, it offers unparalleled
                  performance and reliability.
                </p>
                <p>
                  Key features include advanced processing capabilities, and an
                  intuitive user interface designed for both beginners and experts.
                </p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Content card</AccordionTrigger>
              <AccordionContent className="flex flex-col gap-4 text-balance">
                <p>
                  We offer worldwide shipping through trusted courier partners.
                  Standard delivery takes 3-5 business days, while express shipping
                  ensures delivery within 1-2 business days.
                </p>
                <p>
                  All orders are carefully packaged and fully insured. Track your
                  shipment in real-time through our dedicated tracking portal.
                </p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>More questions?</AccordionTrigger>
              <AccordionContent className="flex flex-col gap-4 text-balance">
                <p>
                  We stand behind our products with a comprehensive 30-day return
                  policy. If you&apos;re not completely satisfied, simply return the
                  item in its original condition.
                </p>
                <p>
                  Our hassle-free return process includes free return shipping and
                  full refunds processed within 48 hours of receiving the returned
                  item.
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </Modal>
    </div>
  );
}

PracticePage.getLayout = function getLayout(page: ReactElement) {
  return <MyAuth>{page}</MyAuth>
}

export default PracticePage