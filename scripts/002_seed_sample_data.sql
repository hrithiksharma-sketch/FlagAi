-- This script seeds sample contracts and data for demo purposes
-- Note: This uses a sample user_id - in production, this would be replaced with actual authenticated user IDs

-- Insert sample contracts
INSERT INTO public.contracts (id, title, document_url, party_a, party_b, contract_type, effective_date, expiration_date, status, total_value, jurisdiction, user_id)
VALUES 
  (gen_random_uuid(), 'Enterprise SaaS Agreement - TechCorp', '/documents/techcorp-saas.pdf', 'Your Company Inc.', 'TechCorp Solutions', 'SaaS', '2025-01-01', '2027-12-31', 'active', 250000.00, 'Delaware, USA', auth.uid()),
  (gen_random_uuid(), 'Master Service Agreement - CloudVendor', '/documents/cloudvendor-msa.pdf', 'Your Company Inc.', 'CloudVendor LLC', 'MSA', '2024-06-15', '2026-06-14', 'active', 480000.00, 'California, USA', auth.uid()),
  (gen_random_uuid(), 'Consulting Services Agreement', '/documents/consulting-agreement.pdf', 'Your Company Inc.', 'Advisory Partners', 'Consulting', '2025-03-01', '2025-09-30', 'active', 85000.00, 'New York, USA', auth.uid()),
  (gen_random_uuid(), 'Data Processing Agreement', '/documents/dpa-vendor.pdf', 'Your Company Inc.', 'Data Services Co', 'DPA', '2024-11-01', '2025-10-31', 'active', 120000.00, 'United Kingdom', auth.uid());

-- Note: The following inserts would need the actual contract IDs from the above inserts
-- In a real scenario, you would use RETURNING id or query the contracts first
-- For demo purposes, we'll use a CTE to reference the inserted contracts

WITH contract_refs AS (
  SELECT id, title FROM public.contracts WHERE user_id = auth.uid() LIMIT 4
)
-- Insert sample clauses
INSERT INTO public.clauses (contract_id, clause_type, title, content, page_number, risk_level)
SELECT 
  (SELECT id FROM contract_refs LIMIT 1),
  'sla',
  'Service Level Agreement - Uptime Guarantee',
  '99.9% uptime guarantee with monthly credits for downtime exceeding 0.1%. Response time for critical issues: 2 hours.',
  12,
  'high'
WHERE EXISTS (SELECT 1 FROM contract_refs);

INSERT INTO public.clauses (contract_id, clause_type, title, content, page_number, risk_level)
SELECT 
  (SELECT id FROM contract_refs LIMIT 1),
  'renewal',
  'Automatic Renewal Terms',
  'This Agreement shall automatically renew for successive one-year periods unless either party provides written notice of non-renewal at least 90 days prior to the end of the then-current term.',
  18,
  'medium'
WHERE EXISTS (SELECT 1 FROM contract_refs);

-- Insert sample obligations
INSERT INTO public.obligations (contract_id, description, due_date, responsible_party, status, priority, assigned_to)
SELECT 
  (SELECT id FROM contract_refs LIMIT 1),
  'Quarterly Business Review - Q1 2026',
  '2026-03-31',
  'Your Company Inc.',
  'pending',
  'medium',
  'Account Manager'
WHERE EXISTS (SELECT 1 FROM contract_refs);

INSERT INTO public.obligations (contract_id, description, due_date, responsible_party, status, priority, assigned_to)
SELECT 
  (SELECT id FROM contract_refs LIMIT 1),
  'Annual Security Audit Submission',
  '2026-06-30',
  'Your Company Inc.',
  'pending',
  'high',
  'Security Team'
WHERE EXISTS (SELECT 1 FROM contract_refs);

INSERT INTO public.obligations (contract_id, description, due_date, responsible_party, status, priority, assigned_to)
SELECT 
  (SELECT id FROM contract_refs LIMIT 1),
  'Renewal Notice Decision',
  '2027-10-02',
  'Your Company Inc.',
  'pending',
  'critical',
  'Legal Team'
WHERE EXISTS (SELECT 1 FROM contract_refs);
