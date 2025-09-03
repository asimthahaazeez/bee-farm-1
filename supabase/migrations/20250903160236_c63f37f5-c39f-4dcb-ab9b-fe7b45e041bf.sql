-- Advanced AI & Predictive Analytics Schema
CREATE TABLE public.hive_analyses (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  hive_id UUID NOT NULL,
  user_id UUID NOT NULL,
  image_url TEXT,
  image_path TEXT,
  health_score INTEGER NOT NULL CHECK (health_score >= 0 AND health_score <= 100),
  population_estimate INTEGER,
  queen_status TEXT,
  brood_pattern_score INTEGER CHECK (brood_pattern_score >= 0 AND brood_pattern_score <= 100),
  honey_stores_level TEXT,
  issues_detected JSONB DEFAULT '[]'::jsonb,
  confidence_score DECIMAL(3,2) CHECK (confidence_score >= 0 AND confidence_score <= 1),
  analysis_metadata JSONB DEFAULT '{}'::jsonb,
  environmental_factors JSONB DEFAULT '{}'::jsonb,
  recommendations TEXT[],
  risk_factors JSONB DEFAULT '[]'::jsonb,
  analysis_date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  processing_status TEXT NOT NULL DEFAULT 'pending' CHECK (processing_status IN ('pending', 'processing', 'completed', 'failed')),
  processing_progress INTEGER DEFAULT 0 CHECK (processing_progress >= 0 AND processing_progress <= 100),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Environmental data correlation
CREATE TABLE public.environmental_data (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  location TEXT NOT NULL,
  date DATE NOT NULL,
  temperature_high DECIMAL(5,2),
  temperature_low DECIMAL(5,2),
  humidity DECIMAL(5,2),
  precipitation DECIMAL(5,2),
  wind_speed DECIMAL(5,2),
  pollen_count JSONB DEFAULT '{}'::jsonb,
  air_quality_index INTEGER,
  uv_index INTEGER,
  weather_conditions TEXT,
  regional_disease_alerts JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(location, date)
);

-- Hive health scoring and predictions
CREATE TABLE public.hive_health_scores (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  hive_id UUID NOT NULL,
  user_id UUID NOT NULL,
  overall_score INTEGER NOT NULL CHECK (overall_score >= 0 AND overall_score <= 100),
  population_score INTEGER CHECK (population_score >= 0 AND population_score <= 100),
  queen_score INTEGER CHECK (queen_score >= 0 AND queen_score <= 100),
  brood_score INTEGER CHECK (brood_score >= 0 AND brood_score <= 100),
  health_trend TEXT CHECK (health_trend IN ('improving', 'stable', 'declining', 'critical')),
  risk_level TEXT CHECK (risk_level IN ('low', 'medium', 'high', 'critical')),
  predictions JSONB DEFAULT '[]'::jsonb,
  contributing_factors JSONB DEFAULT '{}'::jsonb,
  score_date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  valid_until TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Predictive alerts and notifications
CREATE TABLE public.predictive_alerts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  hive_id UUID,
  alert_type TEXT NOT NULL CHECK (alert_type IN ('disease_risk', 'pest_infestation', 'environmental_stress', 'queen_issue', 'swarm_prediction', 'honey_flow')),
  severity TEXT NOT NULL CHECK (severity IN ('low', 'medium', 'high', 'critical')),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  predicted_date TIMESTAMP WITH TIME ZONE,
  confidence_score DECIMAL(3,2) CHECK (confidence_score >= 0 AND confidence_score <= 1),
  recommendations TEXT[],
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'acknowledged', 'resolved', 'dismissed')),
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Financial automation schema
CREATE TABLE public.financial_transactions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  hive_id UUID,
  transaction_type TEXT NOT NULL CHECK (transaction_type IN ('income', 'expense')),
  category TEXT NOT NULL,
  subcategory TEXT,
  amount DECIMAL(10,2) NOT NULL,
  currency TEXT NOT NULL DEFAULT 'USD',
  description TEXT,
  transaction_date DATE NOT NULL,
  vendor_name TEXT,
  receipt_url TEXT,
  tax_deductible BOOLEAN DEFAULT false,
  tags TEXT[],
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- P&L reporting cache
CREATE TABLE public.profit_loss_reports (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  report_period TEXT NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  total_revenue DECIMAL(10,2) NOT NULL DEFAULT 0,
  total_expenses DECIMAL(10,2) NOT NULL DEFAULT 0,
  net_profit DECIMAL(10,2) NOT NULL DEFAULT 0,
  expense_breakdown JSONB DEFAULT '{}'::jsonb,
  revenue_breakdown JSONB DEFAULT '{}'::jsonb,
  tax_summary JSONB DEFAULT '{}'::jsonb,
  report_data JSONB NOT NULL,
  generated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Security audit logs
CREATE TABLE public.security_audit_logs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID,
  event_type TEXT NOT NULL,
  event_category TEXT NOT NULL CHECK (event_category IN ('authentication', 'authorization', 'data_access', 'data_modification', 'security_violation', 'system_event')),
  severity TEXT NOT NULL CHECK (severity IN ('info', 'warning', 'error', 'critical')),
  description TEXT NOT NULL,
  ip_address INET,
  user_agent TEXT,
  session_id TEXT,
  resource_accessed TEXT,
  event_metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Fraud detection logs
CREATE TABLE public.fraud_detection_logs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID,
  transaction_id UUID,
  detection_type TEXT NOT NULL,
  risk_score DECIMAL(3,2) CHECK (risk_score >= 0 AND risk_score <= 1),
  flags JSONB DEFAULT '[]'::jsonb,
  status TEXT NOT NULL DEFAULT 'flagged' CHECK (status IN ('flagged', 'reviewing', 'approved', 'rejected')),
  reviewer_id UUID,
  reviewer_notes TEXT,
  resolved_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.hive_analyses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.environmental_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.hive_health_scores ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.predictive_alerts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.financial_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profit_loss_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.security_audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.fraud_detection_logs ENABLE ROW LEVEL SECURITY;

-- RLS Policies for hive_analyses
CREATE POLICY "Users can view their own hive analyses" 
ON public.hive_analyses FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own hive analyses" 
ON public.hive_analyses FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own hive analyses" 
ON public.hive_analyses FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own hive analyses" 
ON public.hive_analyses FOR DELETE 
USING (auth.uid() = user_id);

-- RLS Policies for environmental_data (public read access)
CREATE POLICY "Anyone can read environmental data" 
ON public.environmental_data FOR SELECT 
USING (true);

CREATE POLICY "Authenticated users can insert environmental data" 
ON public.environmental_data FOR INSERT 
WITH CHECK (auth.uid() IS NOT NULL);

-- RLS Policies for hive_health_scores
CREATE POLICY "Users can view their own hive health scores" 
ON public.hive_health_scores FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own hive health scores" 
ON public.hive_health_scores FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own hive health scores" 
ON public.hive_health_scores FOR UPDATE 
USING (auth.uid() = user_id);

-- RLS Policies for predictive_alerts
CREATE POLICY "Users can view their own alerts" 
ON public.predictive_alerts FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own alerts" 
ON public.predictive_alerts FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own alerts" 
ON public.predictive_alerts FOR UPDATE 
USING (auth.uid() = user_id);

-- RLS Policies for financial_transactions
CREATE POLICY "Users can view their own financial transactions" 
ON public.financial_transactions FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own financial transactions" 
ON public.financial_transactions FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own financial transactions" 
ON public.financial_transactions FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own financial transactions" 
ON public.financial_transactions FOR DELETE 
USING (auth.uid() = user_id);

-- RLS Policies for profit_loss_reports
CREATE POLICY "Users can view their own P&L reports" 
ON public.profit_loss_reports FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own P&L reports" 
ON public.profit_loss_reports FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- Admin-only policies for security logs
CREATE POLICY "Admin users can view security audit logs" 
ON public.security_audit_logs FOR SELECT 
USING (auth.jwt() ->> 'role' = 'admin');

CREATE POLICY "System can insert security audit logs" 
ON public.security_audit_logs FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Admin users can view fraud detection logs" 
ON public.fraud_detection_logs FOR SELECT 
USING (auth.jwt() ->> 'role' = 'admin');

CREATE POLICY "System can insert fraud detection logs" 
ON public.fraud_detection_logs FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Admin users can update fraud detection logs" 
ON public.fraud_detection_logs FOR UPDATE 
USING (auth.jwt() ->> 'role' = 'admin');

-- Indexes for performance
CREATE INDEX idx_hive_analyses_hive_id ON public.hive_analyses(hive_id);
CREATE INDEX idx_hive_analyses_user_id ON public.hive_analyses(user_id);
CREATE INDEX idx_hive_analyses_date ON public.hive_analyses(analysis_date);
CREATE INDEX idx_hive_analyses_status ON public.hive_analyses(processing_status);

CREATE INDEX idx_environmental_data_location_date ON public.environmental_data(location, date);
CREATE INDEX idx_environmental_data_date ON public.environmental_data(date);

CREATE INDEX idx_hive_health_scores_hive_id ON public.hive_health_scores(hive_id);
CREATE INDEX idx_hive_health_scores_user_id ON public.hive_health_scores(user_id);
CREATE INDEX idx_hive_health_scores_date ON public.hive_health_scores(score_date);

CREATE INDEX idx_predictive_alerts_user_id ON public.predictive_alerts(user_id);
CREATE INDEX idx_predictive_alerts_hive_id ON public.predictive_alerts(hive_id);
CREATE INDEX idx_predictive_alerts_type ON public.predictive_alerts(alert_type);
CREATE INDEX idx_predictive_alerts_severity ON public.predictive_alerts(severity);
CREATE INDEX idx_predictive_alerts_status ON public.predictive_alerts(status);

CREATE INDEX idx_financial_transactions_user_id ON public.financial_transactions(user_id);
CREATE INDEX idx_financial_transactions_hive_id ON public.financial_transactions(hive_id);
CREATE INDEX idx_financial_transactions_type ON public.financial_transactions(transaction_type);
CREATE INDEX idx_financial_transactions_date ON public.financial_transactions(transaction_date);
CREATE INDEX idx_financial_transactions_category ON public.financial_transactions(category);

CREATE INDEX idx_profit_loss_reports_user_id ON public.profit_loss_reports(user_id);
CREATE INDEX idx_profit_loss_reports_period ON public.profit_loss_reports(report_period);
CREATE INDEX idx_profit_loss_reports_dates ON public.profit_loss_reports(start_date, end_date);

CREATE INDEX idx_security_audit_logs_user_id ON public.security_audit_logs(user_id);
CREATE INDEX idx_security_audit_logs_category ON public.security_audit_logs(event_category);
CREATE INDEX idx_security_audit_logs_severity ON public.security_audit_logs(severity);
CREATE INDEX idx_security_audit_logs_date ON public.security_audit_logs(created_at);

CREATE INDEX idx_fraud_detection_logs_user_id ON public.fraud_detection_logs(user_id);
CREATE INDEX idx_fraud_detection_logs_risk_score ON public.fraud_detection_logs(risk_score);
CREATE INDEX idx_fraud_detection_logs_status ON public.fraud_detection_logs(status);

-- Triggers for updated_at columns
CREATE TRIGGER update_hive_analyses_updated_at
  BEFORE UPDATE ON public.hive_analyses
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_hive_health_scores_updated_at
  BEFORE UPDATE ON public.hive_health_scores
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_predictive_alerts_updated_at
  BEFORE UPDATE ON public.predictive_alerts
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_financial_transactions_updated_at
  BEFORE UPDATE ON public.financial_transactions
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_fraud_detection_logs_updated_at
  BEFORE UPDATE ON public.fraud_detection_logs
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();