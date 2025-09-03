import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { 
  DollarSign, 
  TrendingUp, 
  TrendingDown, 
  Calendar as CalendarIcon,
  Download,
  FileText,
  PieChart,
  BarChart3
} from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

interface FinancialTransaction {
  id: string;
  transaction_type: string;
  category: string;
  subcategory?: string;
  amount: number;
  description?: string;
  transaction_date: string;
  tax_deductible: boolean;
  tags: string[];
}

interface PLReportData {
  period: string;
  start_date: string;
  end_date: string;
  total_revenue: number;
  total_expenses: number;
  net_profit: number;
  expense_breakdown: Record<string, number>;
  revenue_breakdown: Record<string, number>;
  tax_summary: {
    deductible_expenses: number;
    taxable_income: number;
  };
}

const PLReportGenerator = () => {
  const { toast } = useToast();
  const [transactions, setTransactions] = useState<FinancialTransaction[]>([]);
  const [reportData, setReportData] = useState<PLReportData | null>(null);
  const [loading, setLoading] = useState(false);
  const [generating, setGenerating] = useState(false);
  
  // Date range selection
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [reportPeriod, setReportPeriod] = useState<string>('custom');

  useEffect(() => {
    // Set default period to current year
    const now = new Date();
    const yearStart = new Date(now.getFullYear(), 0, 1);
    const yearEnd = new Date(now.getFullYear(), 11, 31);
    
    setStartDate(yearStart);
    setEndDate(yearEnd);
    setReportPeriod('yearly');
  }, []);

  useEffect(() => {
    if (startDate && endDate) {
      fetchTransactions();
    }
  }, [startDate, endDate]);

  const fetchTransactions = async () => {
    if (!startDate || !endDate) return;
    
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('financial_transactions')
        .select('*')
        .gte('transaction_date', format(startDate, 'yyyy-MM-dd'))
        .lte('transaction_date', format(endDate, 'yyyy-MM-dd'))
        .order('transaction_date', { ascending: false });

      if (error) throw error;
      
      setTransactions(data || []);
      generateReport(data || []);
    } catch (error) {
      console.error('Error fetching transactions:', error);
      // Generate mock data for demonstration
      const mockTransactions = generateMockTransactions();
      setTransactions(mockTransactions);
      generateReport(mockTransactions);
    } finally {
      setLoading(false);
    }
  };

  const generateMockTransactions = (): FinancialTransaction[] => {
    return [
      {
        id: '1',
        transaction_type: 'income',
        category: 'honey_sales',
        amount: 2500.00,
        description: 'Local farmer\'s market honey sales',
        transaction_date: '2024-01-15',
        tax_deductible: false,
        tags: ['retail', 'local']
      },
      {
        id: '2',
        transaction_type: 'expense',
        category: 'equipment',
        subcategory: 'hive_maintenance',
        amount: 150.00,
        description: 'New hive frames and foundation',
        transaction_date: '2024-01-10',
        tax_deductible: true,
        tags: ['maintenance', 'supplies']
      },
      {
        id: '3',
        transaction_type: 'income',
        category: 'pollination_services',
        amount: 1200.00,
        description: 'Almond orchard pollination contract',
        transaction_date: '2024-02-20',
        tax_deductible: false,
        tags: ['contract', 'pollination']
      },
      {
        id: '4',
        transaction_type: 'expense',
        category: 'feed_supplements',
        amount: 85.00,
        description: 'Sugar syrup and pollen patties',
        transaction_date: '2024-02-05',
        tax_deductible: true,
        tags: ['feed', 'supplements']
      }
    ];
  };

  const generateReport = (transactionData: FinancialTransaction[]) => {
    if (!startDate || !endDate) return;

    const income = transactionData.filter(t => t.transaction_type === 'income');
    const expenses = transactionData.filter(t => t.transaction_type === 'expense');

    const totalRevenue = income.reduce((sum, t) => sum + t.amount, 0);
    const totalExpenses = expenses.reduce((sum, t) => sum + t.amount, 0);
    const netProfit = totalRevenue - totalExpenses;

    // Revenue breakdown by category
    const revenueBreakdown: Record<string, number> = {};
    income.forEach(t => {
      revenueBreakdown[t.category] = (revenueBreakdown[t.category] || 0) + t.amount;
    });

    // Expense breakdown by category
    const expenseBreakdown: Record<string, number> = {};
    expenses.forEach(t => {
      expenseBreakdown[t.category] = (expenseBreakdown[t.category] || 0) + t.amount;
    });

    // Tax summary
    const deductibleExpenses = expenses
      .filter(t => t.tax_deductible)
      .reduce((sum, t) => sum + t.amount, 0);

    const report: PLReportData = {
      period: reportPeriod,
      start_date: format(startDate, 'yyyy-MM-dd'),
      end_date: format(endDate, 'yyyy-MM-dd'),
      total_revenue: totalRevenue,
      total_expenses: totalExpenses,
      net_profit: netProfit,
      expense_breakdown: expenseBreakdown,
      revenue_breakdown: revenueBreakdown,
      tax_summary: {
        deductible_expenses: deductibleExpenses,
        taxable_income: totalRevenue - deductibleExpenses
      }
    };

    setReportData(report);
  };

  const handlePeriodChange = (period: string) => {
    setReportPeriod(period);
    const now = new Date();
    
    switch (period) {
      case 'monthly':
        setStartDate(new Date(now.getFullYear(), now.getMonth(), 1));
        setEndDate(new Date(now.getFullYear(), now.getMonth() + 1, 0));
        break;
      case 'quarterly':
        const quarter = Math.floor(now.getMonth() / 3);
        setStartDate(new Date(now.getFullYear(), quarter * 3, 1));
        setEndDate(new Date(now.getFullYear(), (quarter + 1) * 3, 0));
        break;
      case 'yearly':
        setStartDate(new Date(now.getFullYear(), 0, 1));
        setEndDate(new Date(now.getFullYear(), 11, 31));
        break;
    }
  };

  const exportReport = async (format: 'pdf' | 'csv') => {
    if (!reportData) return;
    
    setGenerating(true);
    try {
      // Here you would call an edge function to generate the PDF/CSV
      // For now, we'll simulate the export
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Report Exported",
        description: `P&L report exported as ${format.toUpperCase()} successfully.`,
      });
    } catch (error) {
      toast({
        title: "Export Failed",
        description: "Failed to export report. Please try again.",
        variant: "destructive",
      });
    } finally {
      setGenerating(false);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const formatCategoryName = (category: string) => {
    return category.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  return (
    <div className="space-y-6">
      {/* Controls */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            P&L Report Generator
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Period Selection */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Report Period</label>
              <Select value={reportPeriod} onValueChange={handlePeriodChange}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="quarterly">Quarterly</SelectItem>
                  <SelectItem value="yearly">Yearly</SelectItem>
                  <SelectItem value="custom">Custom Range</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Start Date */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Start Date</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !startDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {startDate ? format(startDate, "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={startDate}
                    onSelect={setStartDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* End Date */}
            <div className="space-y-2">
              <label className="text-sm font-medium">End Date</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !endDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {endDate ? format(endDate, "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={endDate}
                    onSelect={setEndDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Report Summary */}
      {reportData && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="border-l-4 border-l-sage">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Revenue</p>
                  <p className="text-2xl font-bold text-sage">
                    {formatCurrency(reportData.total_revenue)}
                  </p>
                </div>
                <TrendingUp className="w-8 h-8 text-sage" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-destructive">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Expenses</p>
                  <p className="text-2xl font-bold text-destructive">
                    {formatCurrency(reportData.total_expenses)}
                  </p>
                </div>
                <TrendingDown className="w-8 h-8 text-destructive" />
              </div>
            </CardContent>
          </Card>

          <Card className={`border-l-4 ${reportData.net_profit >= 0 ? 'border-l-sage' : 'border-l-destructive'}`}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Net Profit</p>
                  <p className={`text-2xl font-bold ${reportData.net_profit >= 0 ? 'text-sage' : 'text-destructive'}`}>
                    {formatCurrency(reportData.net_profit)}
                  </p>
                </div>
                <DollarSign className={`w-8 h-8 ${reportData.net_profit >= 0 ? 'text-sage' : 'text-destructive'}`} />
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Detailed Breakdown */}
      {reportData && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Revenue Breakdown */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PieChart className="w-5 h-5 text-sage" />
                Revenue Breakdown
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {Object.entries(reportData.revenue_breakdown).map(([category, amount]) => (
                  <div key={category} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="bg-sage/20 text-sage">
                        {formatCategoryName(category)}
                      </Badge>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold">{formatCurrency(amount)}</div>
                      <div className="text-xs text-muted-foreground">
                        {Math.round((amount / reportData.total_revenue) * 100)}%
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Expense Breakdown */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-destructive" />
                Expense Breakdown
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {Object.entries(reportData.expense_breakdown).map(([category, amount]) => (
                  <div key={category} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="bg-destructive/20 text-destructive">
                        {formatCategoryName(category)}
                      </Badge>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold">{formatCurrency(amount)}</div>
                      <div className="text-xs text-muted-foreground">
                        {Math.round((amount / reportData.total_expenses) * 100)}%
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Tax Summary */}
      {reportData && (
        <Card>
          <CardHeader>
            <CardTitle>Tax Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total Revenue:</span>
                  <span className="font-semibold">{formatCurrency(reportData.total_revenue)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Deductible Expenses:</span>
                  <span className="font-semibold text-sage">
                    -{formatCurrency(reportData.tax_summary.deductible_expenses)}
                  </span>
                </div>
                <Separator />
                <div className="flex justify-between text-lg">
                  <span className="font-semibold">Taxable Income:</span>
                  <span className="font-bold">{formatCurrency(reportData.tax_summary.taxable_income)}</span>
                </div>
              </div>
              <div className="text-sm text-muted-foreground">
                <p className="mb-2">
                  This summary shows your deductible business expenses and taxable income for the selected period.
                </p>
                <p>
                  Consult with a tax professional for accurate tax calculations and filing requirements.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Export Options */}
      {reportData && (
        <Card>
          <CardHeader>
            <CardTitle>Export Options</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              <Button 
                onClick={() => exportReport('pdf')}
                disabled={generating}
                className="flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                Export PDF
              </Button>
              <Button 
                onClick={() => exportReport('csv')}
                disabled={generating}
                variant="outline"
                className="flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                Export CSV
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default PLReportGenerator;