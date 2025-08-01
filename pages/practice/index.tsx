import { useState } from "react";
import { generateClient } from "aws-amplify/data";
import { RealtimeAgent, RealtimeSession } from "@openai/agents/realtime";
import type { Schema } from "@/amplify/data/resource";



import ToggleSwitch from "@/components/ui/ToggleSwitch";
import Body from "@/components/layout/Body";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import Modal from "@/components/ui/Model";

import { CasualPrompt, IELTSPrompt, TOEICPrompt } from '@/services/prompts/realtimePrompts'


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
  agentSelected: string, 
  voiceSelected: string, 
  speedSelected: string
}

const getSession = async ({ agentSelected, voiceSelected, speedSelected }: sessionArg) => {
  const data = await getKey();

  let agent: RealtimeAgent;
  let agentVoice: string;
  let agentSpeed: number;

  switch (agentSelected) {
    case 'IELTS-Style':
      agent = new RealtimeAgent({
        name: 'IELTS Examiner',
        instructions:
          IELTSPrompt,
      });
      break;

    case 'TOEIC-Style':
      agent = new RealtimeAgent({
        name: 'TOEIC Examiner',
        instructions:
          TOEICPrompt,
      });
      break;

    case 'Casual':
    default:
      agent = new RealtimeAgent({
        name: 'Conversation Tutor',
        instructions:
          CasualPrompt,
      });
      break;
  }

  switch (voiceSelected) {
    case 'Alloy':
      agentVoice = 'alloy';
      break;
    case 'Ash':
      agentVoice = 'ash';
      break;
    case 'Ballad':
      agentVoice = 'ballad';
      break;
    case 'Coral':
      agentVoice = 'coral';
      break;
    case 'Echo':
      agentVoice = 'echo';
      break;
    case 'Sage':
      agentVoice = 'sage';
      break;
    case 'Shimmer':
      agentVoice = 'shimmer';
      break;
    case 'Verse':
      agentVoice = 'verse';
      break;
    default:
      agentVoice = 'alloy';
      break;
  }

  switch (speedSelected) {
    case 'Fast':
      agentSpeed = 1.25;
      break;
    case 'Normal':
      agentSpeed = 1;
      break;
    case 'Slow':
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

export default function PracticePage() {
  const [active, setActive] = useState(false);
  const [agentSelected, setAgent] = useState('Casual');
  const [voiceSelected, setVoice] = useState('Alloy');
  const [speedSelected, setSpeed] = useState('Normal');
  const [isModalOpen, setModalOpen] = useState(false)

  const handleStart = async () => {
    await getSession({ agentSelected, voiceSelected, speedSelected });
    setActive(true);
  };

  const handleStop = async () => {
    endSession();
    setActive(false);
  };

  return (
    <Layout>
      <Header pageTitle="Practice"/>
      <Body>
        <ToggleSwitch
          layoutIdPrefix="agent"
          options={['Casual', 'IELTS-Style', 'TOEIC-Style']}
          value={agentSelected}
          onChange={setAgent}
        />
        <Button onClick={handleStart} disabled={active}>
          Start Session
        </Button>
        <Button>
          Move on
        </Button>
        <Button onClick={handleStop} disabled={!active}>
          End Session
        </Button>

        <Button
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          onClick={() => setModalOpen(true)}
        >
          Setting
        </Button>
        <Modal
          isOpen={isModalOpen}
          onClose={() => setModalOpen(false)}
          title="Welcome"
        >
          <p className="text-sm text-gray-700">This is a reusable modal built with TypeScript.</p>
          <ToggleSwitch
            layoutIdPrefix="voice"
            options={['Alloy', 'Ash', 'Ballad', 'Coral', 'Echo', 'Sage', 'Shimmer', 'Verse']}
            value={voiceSelected}
            onChange={setVoice}
          />
          <ToggleSwitch
            layoutIdPrefix="speed"
            options={['Slow', 'Normal', 'Fast']}
            value={speedSelected}
            onChange={setSpeed}
          />
        </Modal>
      </Body>
    </Layout>
  );
}