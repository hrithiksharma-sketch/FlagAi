-- Create contracts table
CREATE TABLE IF NOT EXISTS public.contracts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  document_url TEXT NOT NULL,
  party_a TEXT,
  party_b TEXT,
  contract_type TEXT,
  effective_date DATE,
  expiration_date DATE,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'expired', 'pending', 'terminated')),
  total_value DECIMAL(15, 2),
  jurisdiction TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE
);

-- Create clauses table for extracted contract clauses
CREATE TABLE IF NOT EXISTS public.clauses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  contract_id UUID NOT NULL REFERENCES public.contracts(id) ON DELETE CASCADE,
  clause_type TEXT NOT NULL CHECK (clause_type IN ('sla', 'renewal', 'indemnity', 'pricing', 'jurisdiction', 'obligation', 'termination', 'payment', 'liability', 'other')),
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  page_number INTEGER,
  risk_level TEXT CHECK (risk_level IN ('low', 'medium', 'high', 'critical')),
  extracted_data JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create obligations table
CREATE TABLE IF NOT EXISTS public.obligations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  contract_id UUID NOT NULL REFERENCES public.contracts(id) ON DELETE CASCADE,
  clause_id UUID REFERENCES public.clauses(id) ON DELETE SET NULL,
  description TEXT NOT NULL,
  due_date DATE,
  responsible_party TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'overdue', 'cancelled')),
  priority TEXT CHECK (priority IN ('low', 'medium', 'high', 'critical')),
  assigned_to TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  completed_at TIMESTAMP WITH TIME ZONE
);

-- Create contract processing status table
CREATE TABLE IF NOT EXISTS public.contract_processing (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  contract_id UUID NOT NULL REFERENCES public.contracts(id) ON DELETE CASCADE,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'completed', 'failed')),
  progress INTEGER DEFAULT 0 CHECK (progress >= 0 AND progress <= 100),
  current_step TEXT,
  error_message TEXT,
  started_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  completed_at TIMESTAMP WITH TIME ZONE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE
);

-- Create Q&A history table
CREATE TABLE IF NOT EXISTS public.qa_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  contract_id UUID REFERENCES public.contracts(id) ON DELETE CASCADE,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  evidence_clauses UUID[] DEFAULT '{}',
  confidence_score DECIMAL(3, 2),
  user_role TEXT CHECK (user_role IN ('legal', 'finance', 'sales', 'service', 'other')),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX idx_contracts_user_id ON public.contracts(user_id);
CREATE INDEX idx_contracts_status ON public.contracts(status);
CREATE INDEX idx_contracts_expiration_date ON public.contracts(expiration_date);
CREATE INDEX idx_clauses_contract_id ON public.clauses(contract_id);
CREATE INDEX idx_clauses_type ON public.clauses(clause_type);
CREATE INDEX idx_obligations_contract_id ON public.obligations(contract_id);
CREATE INDEX idx_obligations_due_date ON public.obligations(due_date);
CREATE INDEX idx_obligations_status ON public.obligations(status);
CREATE INDEX idx_processing_contract_id ON public.contract_processing(contract_id);
CREATE INDEX idx_qa_history_contract_id ON public.qa_history(contract_id);
CREATE INDEX idx_qa_history_user_id ON public.qa_history(user_id);

-- Enable Row Level Security
ALTER TABLE public.contracts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.clauses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.obligations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contract_processing ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.qa_history ENABLE ROW LEVEL SECURITY;

-- RLS Policies for contracts
CREATE POLICY "Users can view their own contracts" 
  ON public.contracts FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own contracts" 
  ON public.contracts FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own contracts" 
  ON public.contracts FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own contracts" 
  ON public.contracts FOR DELETE 
  USING (auth.uid() = user_id);

-- RLS Policies for clauses
CREATE POLICY "Users can view clauses of their contracts" 
  ON public.clauses FOR SELECT 
  USING (EXISTS (
    SELECT 1 FROM public.contracts 
    WHERE contracts.id = clauses.contract_id 
    AND contracts.user_id = auth.uid()
  ));

CREATE POLICY "Users can insert clauses for their contracts" 
  ON public.clauses FOR INSERT 
  WITH CHECK (EXISTS (
    SELECT 1 FROM public.contracts 
    WHERE contracts.id = clauses.contract_id 
    AND contracts.user_id = auth.uid()
  ));

CREATE POLICY "Users can update clauses of their contracts" 
  ON public.clauses FOR UPDATE 
  USING (EXISTS (
    SELECT 1 FROM public.contracts 
    WHERE contracts.id = clauses.contract_id 
    AND contracts.user_id = auth.uid()
  ));

CREATE POLICY "Users can delete clauses of their contracts" 
  ON public.clauses FOR DELETE 
  USING (EXISTS (
    SELECT 1 FROM public.contracts 
    WHERE contracts.id = clauses.contract_id 
    AND contracts.user_id = auth.uid()
  ));

-- RLS Policies for obligations
CREATE POLICY "Users can view obligations of their contracts" 
  ON public.obligations FOR SELECT 
  USING (EXISTS (
    SELECT 1 FROM public.contracts 
    WHERE contracts.id = obligations.contract_id 
    AND contracts.user_id = auth.uid()
  ));

CREATE POLICY "Users can insert obligations for their contracts" 
  ON public.obligations FOR INSERT 
  WITH CHECK (EXISTS (
    SELECT 1 FROM public.contracts 
    WHERE contracts.id = obligations.contract_id 
    AND contracts.user_id = auth.uid()
  ));

CREATE POLICY "Users can update obligations of their contracts" 
  ON public.obligations FOR UPDATE 
  USING (EXISTS (
    SELECT 1 FROM public.contracts 
    WHERE contracts.id = obligations.contract_id 
    AND contracts.user_id = auth.uid()
  ));

CREATE POLICY "Users can delete obligations of their contracts" 
  ON public.obligations FOR DELETE 
  USING (EXISTS (
    SELECT 1 FROM public.contracts 
    WHERE contracts.id = obligations.contract_id 
    AND contracts.user_id = auth.uid()
  ));

-- RLS Policies for contract_processing
CREATE POLICY "Users can view their own processing records" 
  ON public.contract_processing FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own processing records" 
  ON public.contract_processing FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own processing records" 
  ON public.contract_processing FOR UPDATE 
  USING (auth.uid() = user_id);

-- RLS Policies for qa_history
CREATE POLICY "Users can view their own Q&A history" 
  ON public.qa_history FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own Q&A records" 
  ON public.qa_history FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own Q&A records" 
  ON public.qa_history FOR DELETE 
  USING (auth.uid() = user_id);
