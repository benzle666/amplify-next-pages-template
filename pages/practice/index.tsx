import { useState } from "react";
import { RealtimeAgent, RealtimeSession} from '@openai/agents/realtime';
import { z } from 'zod';

import ToggleSwitch from "@/components/ui/ToggleSwitch";
import Body from "@/components/layout/Body";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import Layout from "@/components/layout/Layout";
import { Button } from "@aws-amplify/ui-react";

let session: RealtimeSession | null = null;

const getSession = async (agentSelected: string) => {
  const res = await fetch('/api/session');
  const data = await res.json();

  let agent: RealtimeAgent;

  switch (agentSelected) {
    case 'IELTS-Style':
      agent = new RealtimeAgent({
        name: 'IELTS Examiner',
        instructions:
          'You are an IELTS Examiner who prompts the user with questions and guides them through the test using a structure similar to the real IELTS exam. You provide scores and feedback at the end.',
      });
      break;

    case 'TOEIC-Style':
      agent = new RealtimeAgent({
        name: 'TOEIC Examiner',
        instructions:
          'You are a TOEIC Examiner who prompts the user with questions and guides them through a TOEIC-style test, providing scores and feedback at the end.',
      });
      break;

    case 'Casual':
    default:
      agent = new RealtimeAgent({
        name: 'Conversation Tutor',
        instructions:
          'You are a helpful tutor who helps the user practice their conversation skills in a casual setting.',
      });
      break;
  }

  session = new RealtimeSession(agent);
  await session.connect({
    apiKey: data.client_secret.value,
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

  const handleStart = async () => {
    await getSession(agentSelected);
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
          options={['Casual', 'IELTS-Style', 'TOEIC-Style']}
          value={agentSelected}
          onChange={setAgent}
        />
        <Button onClick={handleStart} isDisabled={active}>
          Start Session
        </Button>
        <Button onClick={handleStop} isDisabled={!active}>
          End Session
        </Button>
      </Body>
    </Layout>
  );
}