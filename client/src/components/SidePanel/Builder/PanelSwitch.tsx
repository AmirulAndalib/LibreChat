import { useState } from 'react';
import type { Action } from 'librechat-data-provider';
import { useGetActionsQuery } from '~/data-provider';
import AssistantPanel from './AssistantPanel';
import { useChatContext } from '~/Providers';
import ActionsPanel from './ActionsPanel';
import { Panel } from '~/common';

export default function PanelSwitch() {
  const { conversation, index } = useChatContext();
  const [activePanel, setActivePanel] = useState(Panel.builder);
  const [action, setAction] = useState<Action | undefined>(undefined);
  const { data: actions = [] } = useGetActionsQuery();

  if (activePanel === Panel.actions || action) {
    return (
      <ActionsPanel
        index={index}
        action={action}
        actions={actions}
        setAction={setAction}
        assistant_id={conversation?.assistant_id}
        activePanel={activePanel}
        setActivePanel={setActivePanel}
      />
    );
  } else if (activePanel === Panel.builder) {
    return (
      <AssistantPanel
        index={index}
        assistant_id={conversation?.assistant_id}
        activePanel={activePanel}
        action={action}
        actions={actions}
        setAction={setAction}
        setActivePanel={setActivePanel}
      />
    );
  }
}
