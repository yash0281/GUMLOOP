import { useState } from 'react';
import { X, CheckCircle2, Sparkles, Globe, FileText, Zap } from 'lucide-react';

interface OnboardingModalProps {
  onClose: () => void;
  onEarnCredits: (amount: number) => void;
}

const tutorials = [
  {
    id: 'web-scraping',
    title: 'Web Scraping 101',
    description: 'Learn how to extract data from any website',
    icon: Globe,
    credits: 200,
    color: 'cyan'
  },
  {
    id: 'ai-summarization',
    title: 'AI Summarization',
    description: 'Summarize long documents with AI',
    icon: FileText,
    credits: 200,
    color: 'blue'
  },
  {
    id: 'automation-basics',
    title: 'Automation Basics',
    description: 'Build your first automated workflow',
    icon: Zap,
    credits: 200,
    color: 'amber'
  },
  {
    id: 'ai-agents',
    title: 'AI Agent Workflows',
    description: 'Create intelligent AI-powered agents',
    icon: Sparkles,
    credits: 400,
    color: 'purple'
  }
];

export function OnboardingModal({ onClose, onEarnCredits }: OnboardingModalProps) {
  const [currentStep, setCurrentStep] = useState<'welcome' | 'tutorials'>('welcome');
  const [completedTutorials, setCompletedTutorials] = useState<string[]>([]);

  const handleStartBuilding = () => {
    setCurrentStep('tutorials');
  };

  const handleCompleteTutorial = (tutorialId: string, credits: number) => {
    if (!completedTutorials.includes(tutorialId)) {
      setCompletedTutorials([...completedTutorials, tutorialId]);
      onEarnCredits(credits);
    }
  };

  const handleSkip = () => {
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
        {currentStep === 'welcome' ? (
          <div className="p-8">
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl">Welcome to FlowBuilder!</h2>
                  <p className="text-sm text-slate-500">Build AI-powered workflows with ease</p>
                </div>
              </div>
              <button
                onClick={handleSkip}
                className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-slate-600" />
              </button>
            </div>

            <div className="space-y-6 mb-8">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-purple-600">1</span>
                </div>
                <div>
                  <h3 className="mb-1">No Sign-In Required</h3>
                  <p className="text-sm text-slate-600">
                    Start building immediately. No commitment walls, no friction.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-purple-600">2</span>
                </div>
                <div>
                  <h3 className="mb-1">Drag & Drop Canvas</h3>
                  <p className="text-sm text-slate-600">
                    Add nodes from the left panel, connect them, and watch your workflow come to life.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-purple-600">3</span>
                </div>
                <div>
                  <h3 className="mb-1">AI Assistant - Gummie</h3>
                  <p className="text-sm text-slate-600">
                    Stuck? Just describe what you want to build and Gummie will add the nodes for you.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-xl p-4 mb-6">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-5 h-5 text-purple-600" />
                <span className="text-purple-900">Earn Credits by Learning</span>
              </div>
              <p className="text-sm text-purple-700">
                Complete tutorials to earn free credits and unlock the full potential of FlowBuilder!
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleSkip}
                className="flex-1 px-4 py-3 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
              >
                Skip for now
              </button>
              <button
                onClick={handleStartBuilding}
                className="flex-1 px-4 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-colors"
              >
                Start Learning
              </button>
            </div>
          </div>
        ) : (
          <div className="p-8">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-2xl mb-2">Interactive Tutorials</h2>
                <p className="text-sm text-slate-600">
                  Complete these tutorials to earn credits and master FlowBuilder
                </p>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-slate-600" />
              </button>
            </div>

            <div className="space-y-3 mb-6">
              {tutorials.map((tutorial) => {
                const Icon = tutorial.icon;
                const isCompleted = completedTutorials.includes(tutorial.id);

                return (
                  <div
                    key={tutorial.id}
                    className={`border rounded-xl p-4 transition-all ${
                      isCompleted
                        ? 'bg-green-50 border-green-200'
                        : 'bg-white border-slate-200 hover:border-purple-300'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        <div className={`w-10 h-10 bg-${tutorial.color}-100 rounded-lg flex items-center justify-center flex-shrink-0`}>
                          {isCompleted ? (
                            <CheckCircle2 className="w-5 h-5 text-green-600" />
                          ) : (
                            <Icon className={`w-5 h-5 text-${tutorial.color}-600`} />
                          )}
                        </div>
                        <div>
                          <h3 className="mb-1">{tutorial.title}</h3>
                          <p className="text-sm text-slate-600">{tutorial.description}</p>
                          {isCompleted && (
                            <div className="text-xs text-green-700 mt-2 flex items-center gap-1">
                              <CheckCircle2 className="w-3 h-3" />
                              Completed! +{tutorial.credits} credits earned
                            </div>
                          )}
                        </div>
                      </div>
                      {!isCompleted && (
                        <button
                          onClick={() => handleCompleteTutorial(tutorial.id, tutorial.credits)}
                          className={`px-4 py-2 bg-${tutorial.color}-600 hover:bg-${tutorial.color}-700 text-white rounded-lg transition-colors text-sm whitespace-nowrap`}
                        >
                          +{tutorial.credits} credits
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-200">
              <div className="text-sm text-slate-600">
                {completedTutorials.length} of {tutorials.length} completed
              </div>
              <button
                onClick={onClose}
                className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
              >
                Start Building
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
