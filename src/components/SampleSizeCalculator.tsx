import React, { useState, useEffect } from 'react';
import { Card } from '../design-system/components/card';
import { Button } from '../design-system/components/button';
import { Input } from '../design-system/components/input';
import './SampleSizeCalculator.css';

export const SampleSizeCalculator: React.FC = () => {
  const [totalUsers, setTotalUsers] = useState<string>('1000000');
  const [dailyActiveUsers, setDailyActiveUsers] = useState<string>('600000');
  const [confidence, setConfidence] = useState<string>('95');
  const [testImpact, setTestImpact] = useState<string>('medium');

  // Simplified sample size based on impact and confidence
  const getRequiredSampleSize = () => {
    const baseSize = confidence === '95' ? 1000 : confidence === '90' ? 500 : 2000;
    const impactMultiplier = testImpact === 'small' ? 5 : testImpact === 'medium' ? 2 : 1;
    return baseSize * impactMultiplier;
  };

  const sampleSizePerVariation = getRequiredSampleSize();
  const totalSampleNeeded = sampleSizePerVariation * 2;
  const dailyActive = parseInt(dailyActiveUsers) || 1;
  const daysToComplete = Math.ceil(totalSampleNeeded / dailyActive);
  const percentOfTotal = ((totalSampleNeeded / parseInt(totalUsers)) * 100).toFixed(1);

  return (
    <Card className="sample-size-calculator">
      <div className="calculator-header">
        <h3>A/B Test Size Calculator</h3>
        <p>Quick way to figure out if you have enough users to run a meaningful test</p>
      </div>

      <div className="calculator-inputs">
        <div className="input-group">
          <label htmlFor="total">How many total users do you have?</label>
          <Input
            id="total"
            type="number"
            value={totalUsers}
            onChange={(e) => setTotalUsers(e.target.value)}
            min="1000"
            step="1000"
            placeholder="e.g., 1000000"
          />
          <span className="help-text">
            Your total user base (all customers who could potentially see this feature)
          </span>
        </div>

        <div className="input-group">
          <label htmlFor="daily">How many active users per day?</label>
          <Input
            id="daily"
            type="number"
            value={dailyActiveUsers}
            onChange={(e) => setDailyActiveUsers(e.target.value)}
            min="100"
            step="100"
            placeholder="e.g., 600000"
          />
          <span className="help-text">
            Average daily users who actually use your app/website
          </span>
        </div>

        <div className="input-group">
          <label htmlFor="impact">What kind of change are you testing?</label>
          <select
            id="impact"
            value={testImpact}
            onChange={(e) => setTestImpact(e.target.value)}
            className="select-input"
          >
            <option value="big">Big change (new feature, major redesign)</option>
            <option value="medium">Medium change (UI updates, flow changes)</option>
            <option value="small">Small change (copy, colors, minor tweaks)</option>
          </select>
          <span className="help-text">
            Bigger changes are easier to measure, small changes need more users
          </span>
        </div>

        <div className="input-group">
          <label htmlFor="confidence">How confident do you need to be?</label>
          <select
            id="confidence"
            value={confidence}
            onChange={(e) => setConfidence(e.target.value)}
            className="select-input"
          >
            <option value="90">Good enough (90%)</option>
            <option value="95">Standard confidence (95%)</option>
            <option value="99">Very high confidence (99%)</option>
          </select>
          <span className="help-text">
            Most teams use standard confidence (95%)
          </span>
        </div>
      </div>

      <div className="calculator-result">
        <h4>Your A/B Test Requirements</h4>
        
        <div className="result-summary">
          <div className="result-item">
            <span className="result-label">Users needed per version:</span>
            <span className="result-value">{sampleSizePerVariation.toLocaleString()}</span>
          </div>
          <div className="result-item">
            <span className="result-label">Total users needed:</span>
            <span className="result-value">{totalSampleNeeded.toLocaleString()}</span>
          </div>
          <div className="result-item">
            <span className="result-label">Days to complete:</span>
            <span className="result-value">{daysToComplete}</span>
          </div>
          <div className="result-item">
            <span className="result-label">% of total users:</span>
            <span className="result-value">{percentOfTotal}%</span>
          </div>
        </div>

        <div className="result-interpretation">
          {daysToComplete <= 1 ? (
            <div className="result-good">
              <strong>✓ Great!</strong> You have plenty of users. Your test will complete in about a day.
              <br />Remember to still run it for at least 2 weeks to capture weekly patterns.
            </div>
          ) : daysToComplete <= 14 ? (
            <div className="result-good">
              <strong>✓ Good to go!</strong> Your test will reach statistical significance in {daysToComplete} days.
              <br />This is a perfect timeframe for getting reliable results.
            </div>
          ) : daysToComplete <= 30 ? (
            <div className="result-okay">
              <strong>⚠ Doable but lengthy</strong> Your test will take about {Math.ceil(daysToComplete / 7)} weeks.
              <br />Consider testing a bigger change or accepting 90% confidence to speed things up.
            </div>
          ) : (
            <div className="result-warning">
              <strong>✗ Too long</strong> This test would take {Math.ceil(daysToComplete / 30)} months!
              <br />Try: Testing bigger changes, using qualitative research, or running a preference test instead.
            </div>
          )}
        </div>

        <div className="test-guidelines">
          <h5>Important reminders for banking A/B tests:</h5>
          <ul>
            <li><strong>Minimum duration:</strong> Always run for at least 2 weeks (even if you hit your numbers sooner)</li>
            <li><strong>Maximum duration:</strong> If a test hasn't reached significance after 4 weeks, stop it</li>
            <li><strong>Feature rollout:</strong> Only test features that are fully ready - no "coming soon" placeholders</li>
            <li><strong>Call centre impact:</strong> Monitor call volumes during the test for unexpected issues</li>
            <li><strong>Segment your results:</strong> Different customer groups may react differently</li>
          </ul>
        </div>
      </div>

      <div className="calculator-examples">
        <p className="examples-title">Common banking A/B tests and their typical requirements:</p>
        <div className="example-grid">
          <div className="example-item">
            <strong>New feature to reduce calls:</strong>
            <span>Big change = ~2,000 users per version</span>
          </div>
          <div className="example-item">
            <strong>Simplifying a complex flow:</strong>
            <span>Medium change = ~4,000 users per version</span>
          </div>
          <div className="example-item">
            <strong>Changing button text/color:</strong>
            <span>Small change = ~10,000 users per version</span>
          </div>
          <div className="example-item">
            <strong>Reordering menu items:</strong>
            <span>Small change = ~10,000 users per version</span>
          </div>
        </div>
      </div>
    </Card>
  );
}; 