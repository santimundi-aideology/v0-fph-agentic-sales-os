"use client"

import * as React from "react"
import { MessageCircle, X, Mic, Sparkles, User, Headphones } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { RetellWebClient } from "retell-client-js-sdk"

export interface VoiceAgent {
  id: string
  name: string
  description: string
  icon: React.ReactNode
  color: string
  status: "available" | "preparing" | "unavailable"
  voiceAgentId?: string // The actual voice agent ID (e.g., ElevenLabs agent ID)
}

const voiceAgents: VoiceAgent[] = [
  {
    id: "agent-1",
    name: "Real Estate Agent",
    description: "Expert in property sales and customer relations",
    icon: <User className="h-5 w-5" />,
    color: "bg-blue-500",
    status: "available",
    voiceAgentId: process.env.NEXT_PUBLIC_REAL_ESTATE_AGENT_ID || "agent_089b6346edcb40edf6b82fc5fe", // Retell agent ID
  },
  {
    id: "agent-2",
    name: "Luxury Property Specialist",
    description: "Specialized in high-end properties and VIP clients",
    icon: <Sparkles className="h-5 w-5" />,
    color: "bg-purple-500",
    status: "available",
    voiceAgentId: process.env.NEXT_PUBLIC_LUXURY_PROPERTY_AGENT_ID || "agent_c2dd0f4655988565e922807e41", // Retell agent ID
  },
  {
    id: "agent-3",
    name: "Customer Service Agent",
    description: "Focused on understanding client needs and preferences",
    icon: <Headphones className="h-5 w-5" />,
    color: "bg-emerald-500",
    status: "available",
    voiceAgentId: process.env.NEXT_PUBLIC_CUSTOMER_SERVICE_AGENT_ID || "agent_1ccce6782d0c7eedc3eef2aea2", // Retell agent ID
  },
  {
    id: "agent-4",
    name: "Appointment Coordinator",
    description: "Handles scheduling and appointment management",
    icon: <Mic className="h-5 w-5" />,
    color: "bg-amber-500",
    status: "available",
    voiceAgentId: process.env.NEXT_PUBLIC_APPOINTMENT_COORDINATOR_AGENT_ID || "agent_47f61bb367ba9f2f20228212a5", // Retell agent ID
  },
]

export function VoiceAgentSelector() {
  const [isOpen, setIsOpen] = React.useState(false)
  const [selectedAgent, setSelectedAgent] = React.useState<VoiceAgent | null>(null)
  const [isCallActive, setIsCallActive] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(false)
  const retellClientRef = React.useRef<RetellWebClient | null>(null)

  // Initialize Retell Web Client
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      retellClientRef.current = new RetellWebClient()
    }

    return () => {
      if (retellClientRef.current) {
        retellClientRef.current.stopCall()
      }
    }
  }, [])

  // Handle Retell call starting/stopping
  React.useEffect(() => {
    if (!selectedAgent?.voiceAgentId || !retellClientRef.current) return

    const startRetellCall = async () => {
      setIsLoading(true)
      try {
        // Get access token from backend
        const response = await fetch('/api/retell-web-call', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ agentId: selectedAgent.voiceAgentId }),
        })

        if (!response.ok) {
          throw new Error('Failed to get access token')
        }

        const { accessToken } = await response.json()

        // Start the call with the access token
        await retellClientRef.current!.startCall({ accessToken })
        setIsCallActive(true)
        console.log("Retell call started for agent:", selectedAgent.id)

      } catch (error) {
        console.error("Error starting Retell call:", error)
        setSelectedAgent(null)
      } finally {
        setIsLoading(false)
      }
    }

    if (selectedAgent && !isCallActive) {
      startRetellCall()
    }

    // Cleanup function
    return () => {
      if (retellClientRef.current && isCallActive) {
        retellClientRef.current.stopCall()
        setIsCallActive(false)
      }
    }
  }, [selectedAgent, isCallActive])

  const handleAgentSelect = (agent: VoiceAgent) => {
    if (agent.status === "available" && !isLoading) {
      setSelectedAgent(agent)
      console.log("Selected agent:", agent.id, "Voice Agent ID:", agent.voiceAgentId)
      // Close the sheet after selection
      setIsOpen(false)
    } else if (agent.status === "preparing") {
      // Show feedback that agent is still being prepared
      setSelectedAgent(null)
      console.log("Agent is still being prepared:", agent.id)
    }
  }

  const handleStopCall = () => {
    if (retellClientRef.current) {
      retellClientRef.current.stopCall()
      setIsCallActive(false)
      setSelectedAgent(null)
    }
  }

  const availableAgents = voiceAgents.filter((agent) => agent.status === "available")
  const hasAvailableAgents = availableAgents.length > 0

  return (
    <>
      {/* Retell Call Status Indicator */}
      {isCallActive && selectedAgent && (
        <div className="fixed bottom-24 right-6 z-50 bg-card border rounded-lg p-4 shadow-lg max-w-xs">
          <div className="flex items-center gap-3">
            <div className={cn("h-3 w-3 rounded-full animate-pulse", selectedAgent.color.replace('bg-', 'bg-'))} />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{selectedAgent.name.split(' (')[0]}</p>
              <p className="text-xs text-muted-foreground">Call in progress</p>
            </div>
            <Button
              onClick={handleStopCall}
              size="sm"
              variant="outline"
              className="h-8 px-3"
            >
              End Call
            </Button>
          </div>
        </div>
      )}

      {/* Floating Chat Bubble */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          size="lg"
          disabled={isLoading}
          className={cn(
            "h-16 w-16 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300",
            "bg-gradient-to-br from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70",
            "flex items-center justify-center",
            "relative group",
            "border-2 border-primary/20",
            "hover:scale-110 active:scale-95",
            isLoading && "opacity-70 cursor-not-allowed"
          )}
          aria-label="Open voice agent selector"
        >
          {isLoading ? (
            <div className="h-7 w-7 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
          ) : (
            <MessageCircle className="h-7 w-7 text-primary-foreground" />
          )}
          {hasAvailableAgents && !isCallActive && (
            <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-emerald-500 border-2 border-background animate-pulse flex items-center justify-center">
              <span className="h-2 w-2 rounded-full bg-white" />
            </span>
          )}
          {isCallActive && (
            <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 border-2 border-background animate-pulse flex items-center justify-center">
              <span className="h-2 w-2 rounded-full bg-white" />
            </span>
          )}
        </Button>
      </div>

      {/* Agent Selection Sheet */}
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent side="right" className="w-full sm:w-[400px] p-0">
          <div className="flex flex-col h-full">
            {/* Header */}
            <SheetHeader className="px-6 pt-6 pb-4 border-b">
              <SheetTitle className="text-xl font-semibold">Select Voice Agent</SheetTitle>
              <SheetDescription>
                Choose an AI voice agent to assist you with your real estate needs
              </SheetDescription>
            </SheetHeader>

            {/* Agent List */}
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-3">
              {voiceAgents.map((agent) => {
                const isPreparing = agent.status === "preparing"
                const isSelected = selectedAgent?.id === agent.id
                const isDisabled = isPreparing || isLoading || isCallActive

                return (
                  <button
                    key={agent.id}
                    onClick={() => handleAgentSelect(agent)}
                    disabled={isDisabled}
                    className={cn(
                      "w-full p-4 rounded-xl border-2 transition-all duration-200",
                      "text-left hover:shadow-lg hover:scale-[1.02]",
                      isSelected
                        ? "border-primary bg-primary/10 shadow-lg ring-2 ring-primary/20"
                        : "border-border bg-card hover:border-primary/50 hover:bg-accent/50",
                      isDisabled && "opacity-60 cursor-not-allowed",
                      !isDisabled && "cursor-pointer"
                    )}
                  >
                    <div className="flex items-start gap-4">
                      {/* Agent Icon */}
                      <div
                        className={cn(
                          "h-14 w-14 rounded-xl flex items-center justify-center text-white shrink-0 shadow-md",
                          "transition-transform duration-200",
                          agent.color,
                          isPreparing && "opacity-50",
                          !isPreparing && "group-hover:scale-110"
                        )}
                      >
                        {agent.icon}
                      </div>

                      {/* Agent Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1.5">
                          <h3 className="font-semibold text-base">{agent.name}</h3>
                          {isPreparing && (
                            <span className="px-2.5 py-1 text-xs rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                              Preparing
                            </span>
                          )}
                          {isLoading && isSelected && (
                            <span className="px-2.5 py-1 text-xs rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
                              Connecting...
                            </span>
                          )}
                          {isCallActive && isSelected && (
                            <span className="px-2.5 py-1 text-xs rounded-full bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20">
                              On Call
                            </span>
                          )}
                          {agent.status === "available" && !isSelected && (
                            <span className="px-2.5 py-1 text-xs rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                              Available
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {agent.description}
                        </p>
                      </div>
                    </div>

                    {/* Selected Indicator */}
                    {isSelected && (
                      <div className="mt-4 pt-4 border-t border-primary/20 bg-primary/5 rounded-lg p-3">
                        <div className="flex items-center gap-2">
                          <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                          <p className="text-xs text-primary font-medium">
                            {isLoading ? "Connecting to agent..." : isCallActive ? "Call in progress" : "Agent selected - Ready to connect"}
                          </p>
                        </div>
                      </div>
                    )}
                  </button>
                )
              })}
            </div>

            {/* Footer */}
            {availableAgents.length === 0 && (
              <div className="px-6 py-4 border-t bg-muted/30">
                <p className="text-xs text-muted-foreground text-center">
                  Voice agents are being configured. They will be available soon.
                </p>
              </div>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </>
  )
}

