# Requirements Document

## Introduction

The AI Rate Card Generator is a new product under Project Hillcrest that helps mid-tier content creators (10K–500K followers) determine fair pricing for brand collaborations. Creators connect their Instagram account (MVP scope), and the system analyzes real engagement data to generate personalized rate recommendations, niche benchmarks, and a shareable media kit link. The product addresses the #1 creator pain point: managing brand deals in DMs with no pricing data, leading to chronic undercharging.

The product follows a freemium model — basic rate card generation is free, while premium unlocks niche benchmarks and customizable branded media kit pages. A built-in viral loop exists: creators share media kit links with brands, driving organic awareness back to the platform.

Future releases will expand platform support to YouTube and TikTok.

## Glossary

- **Rate_Card_Generator**: The core AI system that analyzes engagement data and produces pricing recommendations for content creators
- **Creator**: A content creator with 10K–500K followers on at least one supported social media platform who uses the system to determine pricing
- **Platform_Connector**: The module responsible for authenticating and retrieving data from the Instagram Graph API (MVP scope; YouTube and TikTok connectors planned for future releases)
- **Engagement_Metrics**: Quantitative data points including likes, comments, shares, saves, views, watch time, and follower growth rate retrieved from connected platforms
- **Rate_Card**: A structured pricing document showing recommended rates for different content formats (post, story, reel, video) based on analyzed engagement data
- **Media_Kit**: A shareable public page containing the creator's rate card, audience demographics, engagement highlights, and portfolio samples
- **Niche_Benchmark**: Comparative pricing and engagement data from creators in the same content category and follower bracket
- **Content_Format**: A specific type of Instagram content deliverable including static post, story, reel, and carousel post
- **Engagement_Rate**: The ratio of total interactions (likes, comments, shares, saves) to total reach or follower count for a given piece of content
- **Pricing_Algorithm**: The AI model that calculates recommended rates using engagement metrics, niche benchmarks, content format, and audience quality signals

## Requirements

### Requirement 1: Social Media Account Connection

**User Story:** As a Creator, I want to connect my Instagram account, so that the system can access my real engagement data for rate calculation.

#### Acceptance Criteria

1. WHEN a Creator initiates a platform connection, THE Platform_Connector SHALL authenticate using Instagram's official OAuth 2.0 flow via the Instagram Graph API
2. THE Platform_Connector SHALL support connection to Instagram Business or Creator accounts (MVP scope: Instagram only; YouTube and TikTok planned for future releases)
3. WHEN authentication succeeds, THE Platform_Connector SHALL retrieve the Creator's Engagement_Metrics from Instagram
4. WHEN authentication fails, THE Platform_Connector SHALL display a descriptive error message and allow the Creator to retry
5. WHEN a Creator disconnects their Instagram account, THE Platform_Connector SHALL remove stored access tokens and cease data retrieval from that platform

### Requirement 2: Engagement Data Retrieval and Analysis

**User Story:** As a Creator, I want the system to analyze my real engagement data, so that my rate recommendations are based on actual performance rather than just follower count.

#### Acceptance Criteria

1. WHEN a platform is connected, THE Rate_Card_Generator SHALL retrieve Engagement_Metrics from the most recent 90 days of content
2. THE Rate_Card_Generator SHALL calculate the Engagement_Rate for each Content_Format the Creator has published
3. THE Rate_Card_Generator SHALL analyze audience quality signals including follower growth rate, comment sentiment, and geographic distribution
4. WHEN a Creator has fewer than 5 posts in a Content_Format, THE Rate_Card_Generator SHALL indicate insufficient data for that format and exclude it from rate recommendations
5. THE Rate_Card_Generator SHALL weight recent content performance higher than older content when calculating engagement scores

### Requirement 3: Rate Card Generation

**User Story:** As a Creator, I want to receive specific pricing recommendations for each content format, so that I know exactly what to charge brands for different deliverables.

#### Acceptance Criteria

1. WHEN engagement analysis completes, THE Pricing_Algorithm SHALL generate a recommended rate for each Content_Format with sufficient data
2. THE Pricing_Algorithm SHALL produce rate recommendations for static posts, stories, reels, and carousel posts on Instagram
3. THE Pricing_Algorithm SHALL factor in Engagement_Rate, audience size, audience quality, content niche, and platform-specific performance when calculating rates
4. THE Rate_Card_Generator SHALL present rates as a range (minimum to recommended) to give Creators negotiation flexibility
5. THE Rate_Card_Generator SHALL display the factors that influenced each rate recommendation to build Creator confidence in the pricing

### Requirement 4: Niche Benchmarking

**User Story:** As a Creator, I want to see how my rates compare to similar creators in my niche and size bracket, so that I can validate my pricing is competitive.

#### Acceptance Criteria

1. THE Rate_Card_Generator SHALL categorize each Creator into a content niche based on their posting history and audience interests
2. THE Rate_Card_Generator SHALL assign each Creator to a follower bracket (10K–50K, 50K–100K, 100K–250K, 250K–500K)
3. WHEN a premium Creator views their rate card, THE Rate_Card_Generator SHALL display percentile ranking of their engagement compared to creators in the same niche and bracket
4. WHEN a premium Creator views their rate card, THE Rate_Card_Generator SHALL show the median and top-quartile rates for their niche and bracket
5. IF benchmark data is unavailable for a Creator's specific niche, THEN THE Rate_Card_Generator SHALL display the closest available niche comparison and indicate the approximation

### Requirement 5: Shareable Media Kit

**User Story:** As a Creator, I want a shareable media kit link I can send to brands, so that I can present my value professionally without manual effort.

#### Acceptance Criteria

1. WHEN a rate card is generated, THE Rate_Card_Generator SHALL produce a unique, publicly accessible media kit URL for the Creator
2. THE Media_Kit SHALL display the Creator's profile summary, engagement highlights, audience demographics, and rate card
3. THE Media_Kit SHALL render correctly on desktop and mobile devices
4. THE Media_Kit SHALL load within 3 seconds on a standard broadband connection
5. WHEN a Creator updates their connected platforms or regenerates their rate card, THE Media_Kit SHALL reflect the updated data within 5 minutes
6. THE Rate_Card_Generator SHALL allow the Creator to choose which Content_Formats and platforms appear on their Media_Kit
7. WHERE a Creator has a premium subscription, THE Media_Kit SHALL support custom branding including logo upload, color scheme selection, and custom domain mapping

### Requirement 6: Rate Card Refresh

**User Story:** As a Creator, I want my rate card to stay current as my engagement changes, so that I always have accurate pricing to share with brands.

#### Acceptance Criteria

1. THE Rate_Card_Generator SHALL automatically refresh Engagement_Metrics from connected platforms every 7 days
2. WHEN a Creator manually requests a refresh, THE Rate_Card_Generator SHALL retrieve and analyze the latest Engagement_Metrics within 60 seconds
3. WHEN refreshed metrics result in a rate change exceeding 15%, THE Rate_Card_Generator SHALL notify the Creator of the significant change
4. THE Rate_Card_Generator SHALL maintain a history of the Creator's rate changes over time

### Requirement 7: Freemium Access Control

**User Story:** As a Creator, I want to access basic rate card features for free and unlock advanced features through a premium subscription, so that I can try the product before committing financially.

#### Acceptance Criteria

1. THE Rate_Card_Generator SHALL allow free-tier Creators to connect their Instagram account and generate a basic rate card
2. THE Rate_Card_Generator SHALL allow free-tier Creators to access a standard-template Media_Kit without custom branding
3. WHERE a Creator has a premium subscription, THE Rate_Card_Generator SHALL provide access to Niche_Benchmark data
4. WHERE a Creator has a premium subscription, THE Rate_Card_Generator SHALL enable Media_Kit customization including branding and custom domain
5. WHEN a free-tier Creator attempts to access a premium feature, THE Rate_Card_Generator SHALL display the feature preview with a clear upgrade prompt

### Requirement 8: Creator Onboarding

**User Story:** As a new Creator, I want a fast and simple onboarding experience, so that I can see my rate card within minutes of signing up.

#### Acceptance Criteria

1. THE Rate_Card_Generator SHALL allow a Creator to complete onboarding and view their first rate card within 5 minutes of account creation
2. WHEN a Creator signs up, THE Rate_Card_Generator SHALL guide them through platform connection with a step-by-step flow
3. THE Rate_Card_Generator SHALL require connection of at least one platform before generating a rate card
4. WHEN onboarding completes, THE Rate_Card_Generator SHALL display the generated rate card immediately without requiring additional navigation

### Requirement 9: Data Privacy and Security

**User Story:** As a Creator, I want my social media data and pricing information to be handled securely, so that I can trust the platform with my account access.

#### Acceptance Criteria

1. THE Rate_Card_Generator SHALL store OAuth tokens using encryption at rest
2. THE Rate_Card_Generator SHALL request only the minimum required permissions from each platform API
3. WHEN a Creator deletes their account, THE Rate_Card_Generator SHALL permanently remove all stored engagement data and access tokens within 24 hours
4. THE Rate_Card_Generator SHALL transmit all data between client and server using TLS 1.2 or higher
5. THE Media_Kit SHALL expose only aggregated engagement statistics and rates, not raw post-level data

### Requirement 10: Media Kit Analytics

**User Story:** As a Creator, I want to know when brands view my media kit, so that I can follow up on potential opportunities.

#### Acceptance Criteria

1. WHEN a brand visits a Creator's Media_Kit URL, THE Rate_Card_Generator SHALL record the view event with timestamp
2. THE Rate_Card_Generator SHALL display total media kit views and view trends to the Creator on their dashboard
3. THE Rate_Card_Generator SHALL not expose visitor identity information to maintain brand privacy
4. WHERE a Creator has a premium subscription, THE Rate_Card_Generator SHALL provide geographic and referral source data for media kit views
