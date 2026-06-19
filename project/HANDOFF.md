# Handoff Document for Sportello Scuola 2.0 - Interpelli Feature Implementation

## Current State (as of 2026-06-02)
The platform has been transformed into "Il copilota AI per Docenti, ATA e Dirigenti" with:
- New homepage structure following specifications
- AI assistants with RAG capabilities (using Supabase + OpenRouter)
- React Router implemented for client-side routing
- Updated color scheme matching logo (Sportello: #235377, Scuola: #1F915E, 2.0: #2F797E)
- All requested sections: Per chi è la piattaforma, Assistenti AI, Calcolo Punteggio, Normative, News, Scadenze, FAQ, Contatti
- SEO optimizations (meta tags, schema.org, sitemap, robots.txt)
- Breadcrumb navigation implemented

## What Needs to be Implemented: Centro Interpelli Nazionale

### Core Requirements:
1. Dedicated page for Centro Interpelli Nazionale
2. Filter system: Regione, Provincia, Classe di concorso, Tipologia posto
3. "Interpelli Smart" cards with:
   - Ricerca interpelli (search functionality)
   - Monitoraggio scadenze (deadline tracking)
   - Supporto candidatura (application guidance)
   - Invio documentazione (document submission help)
4. Alert Interpelli: Users save specific codes (A012, A022, ADSS) and get email alerts
5. News + Scadenze section automatically updated from Ministry of Education site
6. Expandable news/scadenze without leaving page

### Technical Implementation Plan:

#### 1. Database Extensions (if storing interpelli data)
Need to add tables for:
- interpelli (id, titolo, regione, provincia, classe_concorso, tipologia_posto, data_pubblicazione, scadenza, descrizione, link_fonte, creato_il)
- interpelli_alerts (id, user_id, interpelli_codes, created_at) - for saved searches/alerts
- Optional: interpelli_sources (for tracking where data comes from)

#### 2. New Components to Create:
- `src/components/InterpelliPage.tsx` - Main page layout
- `src/components/InterpelliFilters.tsx` - Filter panel with regione, provincia, classe_concorso, tipologia_posto
- `src/components/InterpelliList.tsx` - Grid of interpelli cards
- `src/components/InterpelliCard.tsx` - Individual interpelli display with smart features
- `src/components/InterpelliAlertManager.tsx` - For saving codes and managing alerts
- `src/components/NewsScadenzeFeed.tsx` - Combined expandable news/scadenze section

#### 3. New Pages:
- `src/pages/InterpelliPage.tsx` - Main interpelli page (route: /interpelli)
- Possibly `src/pages/NewsScadenzePage.tsx` if separating from homepage

#### 4. Data Strategy Options:
Option A (Recommended for MVP): Use mock data/static JSON for demo
Option B: Implement simple web scraping (with caution for ToS)
Option C: Integrate with official APIs if available (check MIUR/ministero istruzione)
Option D: Allow admin upload of interpelli data via CSV/Excel

Given time constraints and potential legal issues with scraping, I recommend:
- For development/demo: Use mock data in a JSON file or Supabase table
- For production: Implement a secure admin panel to upload/update interpelli data
- For alerts: Store user preferences and have a backend cron job (or use Supabase functions) to check for new matches and send emails

#### 5. Key Implementation Details:

**Interpelli Card Features:**
- Display: Titolo, Regione, Provincia, Classe di Concorso, Tipologia Posto, Scadenza
- "Ricerca interpelli": Button/link to save this interpelli type for alerts
- "Monitoraggio scadenze": Visual countdown or color-coded urgency (red if <3 days)
- "Supporto candidatura": Link to AI assistant with pre-filled prompt: "Come devo presentare la domanda per questo interpello [details]?"
- "Invio documentazione": Link to AI assistant with pre-filled prompt: "Quali documenti devo allegare per l'interpello [details]?"

**Alert System:**
- Users can save specific classe di concorso codes (e.g., A012, A022, ADSS)
- System checks new interpelli against saved codes
- When match found, sends email (would need email service integration)
- Simple implementation: Store alerts in database, have a daily check script

**News + Scadenze Section:**
- Create a combined feed that shows both news and upcoming scadenze
- Make each item expandable to show more details without leaving page
- For demo: Use mock data or RSS feeds from ministry sites
- For production: Implement a lightweight scraper or use official RSS/API if available

#### 6. Routes to Add:
- `/interpelli` - Main Interpelli page
- Possibly `/interpelli/alerts` - Manage alert preferences

#### 7. UI/UX Considerations:
- Use the established color scheme from the logo
- Filters should be collapsible/sidebar on desktop, full-screen modal on mobile
- Interpelli cards should be visually distinct and informative
- Alert saving should be prominent on each card
- News/scadenze feed should have "Load more" or infinite scroll

## Files I Will Create/Modify:

### New Components:
- src/components/InterpelliFilters.tsx
- src/components/InterpelliList.tsx  
- src/components/InterpelliCard.tsx
- src/components/InterpelliAlertManager.tsx
- src/components/NewsScadenzeFeed.tsx
- src/components/InterpelliPage.tsx (page component)

### New Pages:
- src/pages/InterpelliPage.tsx
- src/pages/NewsScadenzePage.tsx (if separating)

### Modified Files:
- src/App.tsx - Add new routes
- src/components/AssistantsAI.tsx - May need to update links to interpelli feature
- src/components/Header.tsx - Add Interpelli to main navigation if appropriate
- index.html - Update title/meta if needed for new page

### Database:
- Update src/rag/database.sql with new tables (if storing data)

## Localhost Link for Visualization:
When the user runs `npm run dev` in the project directory, the site will be available at:
**http://localhost:5173**

The Interpelli feature will be accessible at:
**http://localhost:5173/interpelli**

## Next Steps After This Handoff:
1. Create the new components and pages as outlined
2. Implement the filter system
3. Create the interpelli card with smart features
4. Build the alert/save functionality
5. Add the news+scadenze combined feed
6. Connect routes and navigation
7. Test with mock data
8. Provide final summary

## Dependencies to Verify:
- react-router-dom (already installed)
- lucide-react (already installed for icons)
- No new major dependencies needed for MVP implementation

## Notes:
- Email alert functionality will require backend setup (beyond frontend scope)
- For true ministry site integration, would need to investigate:
  - Official APIs from Ministero dell'Istruzione e del Merito
  - RSS feeds (if available)
  - Web scraping considerations (check terms of service, rate limiting)
- Starting with mock data allows us to perfect the UI/UX before adding live data