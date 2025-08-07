import { useState, ReactElement } from "react";
import { generateClient } from "aws-amplify/data";
import { RealtimeAgent, RealtimeSession } from "@openai/agents/realtime";
import type { Schema } from "@/amplify/data/resource";
import type { NextPageWithLayout } from '@/pages/_app';


import MyAuth from '@/components/layout/MyAuth';
import Layout from "@/components/layout/Layout";
import Header from "@/components/layout/Header";

import Modal from "@/components/ui/Model";
import Selection from "@/components/ui/Selection";
import SessionControls from "@/components/ui/SessionControls";


// Options select
const formatOptions = [
  { label: "IELTS", value: "ielts" },
  { label: "TOEIC", value: "toeic", badge: "beta" },
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
        console.error("No data in apiResult");
      }
    })
    .catch(err => {
      console.error("Error fetching key:", err);
    });
}

// Realtime API
let session: RealtimeSession | null = null;

type sessionArg = {
  selectedFormat: string, 
  selectedVoice: string, 
  selectedSpeed: string
}

const getSession = async ({ selectedFormat, selectedVoice, selectedSpeed }: sessionArg) => {
  const data = await getKey();

  let agent: RealtimeAgent;
  let agentVoice: string;
  let agentSpeed: number;

  switch (selectedFormat) {
    case 'ielts':
      agent = new RealtimeAgent({
        name: 'IELTS Examiner',
        instructions:
          'IELTSPrompt',
      });
      break;

    case 'toeic':
      agent = new RealtimeAgent({
        name: 'TOEIC Examiner',
        instructions:
          'TOEICPrompt',
      });
      break;

    case 'casual':
    default:
      agent = new RealtimeAgent({
        name: 'Conversation Tutor',
        instructions:
          'CasualPrompt',
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
  const [isModalOpen, setModalOpen] = useState(false)
  const [selectedFormat, setSelectedFormat] = useState<string>("ielts")
  const [selectedVoice, setSelectedVoice] = useState<string>("alloy")
  const [selectedSpeed, setSelectedSpeed] = useState<string>("normal")
  
  const handleStart = async () => {
    await getSession({ selectedFormat, selectedVoice, selectedSpeed });
    setActive(true);
  };
  
  const handleStop = async () => {
    endSession();
    setActive(false);
  };

  return (
    <Layout>
      <Header/>
        <div className="flex flex-col items-center space-y-4 pb-6">
          {/* SelectBars */}
          <div className="w-full flex justify-center mt-6">
            <div className="flex gap-4">
              <Selection
                label="Select Format"
                options={formatOptions}
                selected={selectedFormat}
                onChange={setSelectedFormat}
              />
              <Selection
                label="Select Voice"
                options={voiceOptions}
                selected={selectedVoice}
                onChange={setSelectedVoice}
              />
              <Selection
                label="Select Speed"
                options={speedOptions}
                selected={selectedSpeed}
                onChange={setSelectedSpeed}
              />
            </div>
          </div>
        </div>
        
        {/* Top content that may overflow */}
        <div className="overflow-y-auto">
          {/* long content here will scroll if needed */}
        </div>

        {/* Push bottom section to bottom */}
        <div className="flex-1" />

        {/* Bottom controls */}
        <div className="flex flex-col items-center space-y-4 pb-6">
          {/* SessionControls */}
          <SessionControls
            onStart={handleStart}
            onNext={() => console.log("Proceeding to next")}
            onStop={handleStop}
            onSettings={() => setModalOpen(true)}
            active={active}
          />
        </div>

        <Modal
          isOpen={isModalOpen}
          onClose={() => setModalOpen(false)}
          title="Welcome"
        >
          <p className="text-sm text-gray-700">This is a reusable modal built with TypeScript.</p>
        </Modal>
    </Layout>
  );
}

PracticePage.getLayout = function getLayout(page: ReactElement) {
  return <MyAuth>{page}</MyAuth>
}

export default PracticePage