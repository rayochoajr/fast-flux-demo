# AWS Amplify Deployment Guide for Fast-Flux-Pure

## 🎯 Overview
This document outlines the deployment process for the Fast-Flux-Pure branch on AWS Amplify, a Next.js application with specific performance and configuration requirements.

## 🔑 Critical Requirements
1. **Performance Parameters**
   - Response time < 3 seconds
   - 0.25 megapixels requirement
   - WebP format only
   - No debouncing on input
   - Immediate image updates

2. **Environment Variables**
   ```env
   REPLICATE_API_TOKEN=<secret-token>
   NEXT_PUBLIC_API_URL=https://<your-amplify-domain>/api
   ```

## 🚀 Deployment Configuration

### Branch Configuration
```yaml
version: 1
applications:
  - frontend:
      phases:
        preBuild:
          commands:
            - npm ci
        build:
          commands:
            - npm run build
      artifacts:
        baseDirectory: .next
        files:
          - '**/*'
      cache:
        paths:
          - node_modules/**/*
          - .next/cache/**/*
    appRoot: .
```

### Required Build Settings
1. **Framework**: Next.js - SSR
2. **Node Version**: 20.x
3. **Build Command**: npm run build
4. **Start Command**: npm start
5. **Output Directory**: .next

## 🔄 CI/CD Pipeline

### 1. Source Stage
- GitHub repository integration
- Branch: fast-flux-pure
- Auto-build enabled

### 2. Build Stage
```bash
# Build sequence
npm ci                  # Clean install
npm run build          # Production build
```

### 3. Deploy Stage
- SSR deployment configuration
- Cache invalidation
- Environment variable injection

## 🛡️ Security Configuration

### Required Permissions
1. **IAM Role Requirements**
   - S3 access for artifacts
   - Secrets Manager access
   - CloudFront invalidation

### Environment Variables
1. **Production**
   ```
   REPLICATE_API_TOKEN: {{resolve:secretsmanager:REPLICATE_API_TOKEN:SecretString}}
   ```

## 🔍 Monitoring & Verification

### Build Verification
1. Check build logs for:
   - Successful npm installation
   - Successful build completion
   - No TypeScript errors
   - No linting issues

### Deployment Verification
1. Verify SSR functionality
2. Check environment variable availability
3. Validate performance metrics
4. Test image processing pipeline

## 🚨 Troubleshooting

### Common Issues
1. **Build Failures**
   - Check Node.js version compatibility
   - Verify npm dependencies
   - Check for missing environment variables

2. **Runtime Errors**
   - Validate SSR configuration
   - Check API endpoint accessibility
   - Verify Replicate API token

### Recovery Steps
1. Review build logs
2. Verify environment variables
3. Check branch configuration
4. Validate amplify.yml settings

## 📋 Deployment Checklist

### Pre-deployment
- [ ] All environment variables configured
- [ ] Branch protection rules set
- [ ] Build configuration validated
- [ ] Security permissions verified

### Post-deployment
- [ ] Verify SSR functionality
- [ ] Test image processing
- [ ] Check performance metrics
- [ ] Validate API endpoints

## 🔄 Rollback Procedure

1. **Immediate Rollback**
   ```bash
   aws amplify start-job --app-id <app-id> --branch-name fast-flux-pure --job-type RETRY --job-id <last-successful-job-id>
   ```

2. **Manual Rollback**
   - Revert to last known good commit
   - Trigger new build
   - Verify deployment

## 📊 Performance Monitoring

### Metrics to Track
1. Build time
2. Deployment success rate
3. Response times
4. Image processing latency

### Alerts
- Build failures
- Performance degradation
- API errors
- Security issues

## 🔐 Security Best Practices

1. **Secret Management**
   - Use AWS Secrets Manager
   - Rotate credentials regularly
   - Implement least privilege access

2. **Access Control**
   - Enable branch protection
   - Implement PR reviews
   - Maintain audit logs

## 📝 Maintenance

### Regular Tasks
1. Update dependencies
2. Review security alerts
3. Optimize build cache
4. Update documentation

### Emergency Procedures
1. Immediate rollback capability
2. Incident response plan
3. Communication protocol

## 🏗️ Infrastructure

### Required Services
1. AWS Amplify
2. AWS Secrets Manager
3. Amazon CloudFront
4. Amazon S3

### Configuration Management
1. Infrastructure as Code
2. Version control
3. Change management
4. Backup strategy

# Fast-Flux-Pure Deployment Map

## 🗓️ Timeline & Current Blockers
```
[START] → 🔴 BUILD → ⛔ DEPLOY → ⏳ VERIFY → [END]
           |
           └─ Current Blockers:
              1. ❌ Build failing (Job #11)
              2. 🔒 No build logs access
              3. 🔄 Platform config conflicts
```

## 📍 Where We Are
- Branch: fast-flux-pure
- Status: Build failing (Job #11)
- Last Attempt: 2025-02-15 21:03:22 UTC
- Environment: AWS Amplify (al2023)

## 🗺️ Deployment Map

### 1️⃣ Pre-Deployment Setup
1. Environment Variables
   ```bash
   REPLICATE_API_TOKEN=<required>
   NEXT_PUBLIC_API_URL=<required>
   ```

2. AWS Configuration
   - [ ] IAM roles configured
   - [ ] Secrets Manager setup
   - [ ] S3 bucket permissions

3. Repository Setup
   - [ ] Branch protection rules
   - [ ] Build hooks configured
   - [ ] PR templates ready

### 2️⃣ Build Configuration
1. Framework Settings
   ```yaml
   Node Version: 20.x
   Framework: Next.js (SSR)
   Build Command: npm run build
   Output Dir: .next
   ```

2. amplify.yml Check
   ```bash
   # Validate configuration
   aws amplify get-app --app-id <app-id>
   aws amplify get-branch --app-id <app-id> --branch-name fast-flux-pure
   ```

### 3️⃣ Deployment Process
1. Initial Deploy
   ```bash
   # Start deployment
   aws amplify start-job \
     --app-id <app-id> \
     --branch-name fast-flux-pure \
     --job-type RELEASE
   ```

2. Verification Steps
   ```bash
   # Check build status
   aws amplify get-job \
     --app-id <app-id> \
     --branch-name fast-flux-pure \
     --job-id <job-id>
   ```

### 4️⃣ Post-Deployment
1. Verification Checklist
   - [ ] SSR functioning
   - [ ] API endpoints responding
   - [ ] Image processing working
   - [ ] Performance metrics met

2. Monitoring Setup
   - [ ] CloudWatch alarms
   - [ ] Performance tracking
   - [ ] Error logging

## 🚨 Emergency Procedures

### 1. Build Failure
```bash
# 1. Check logs
aws amplify get-job --app-id <app-id> --branch-name fast-flux-pure --job-id <job-id>

# 2. Retry build
aws amplify start-job --app-id <app-id> --branch-name fast-flux-pure --job-type RETRY
```

### 2. Rollback Process
```bash
# Quick rollback to last working version
aws amplify start-job \
  --app-id <app-id> \
  --branch-name fast-flux-pure \
  --job-type RETRY \
  --job-id <last-successful-job-id>
```

## 📊 Performance Requirements

### 1. Response Times
- API Response: < 3s
- Image Processing: < 5s
- Page Load: < 2s

### 2. Image Requirements
- Resolution: 0.25 megapixels
- Format: WebP only
- Updates: Immediate (no debounce)

## 🔍 Troubleshooting Map

### 1. Build Issues
1. Check Node version
2. Verify npm dependencies
3. Validate environment variables
4. Review build logs

### 2. Runtime Issues
1. Verify SSR configuration
2. Check API endpoints
3. Validate token access
4. Monitor performance

### 3. Performance Issues
1. Check CloudWatch metrics
2. Review access logs
3. Analyze API latency
4. Monitor resource usage

## 📝 Daily Operations

### 1. Morning Checklist
- [ ] Check build status
- [ ] Review error logs
- [ ] Monitor performance
- [ ] Verify endpoints

### 2. Maintenance Windows
- Security updates: Sundays 00:00 UTC
- Dependency updates: Monthly
- Performance review: Weekly

## 🔄 Current Action Items
1. 🔴 Get build logs access
2. 🟡 Separate platform configs
3. 🟢 Update documentation
4. 🟡 Configure monitoring 