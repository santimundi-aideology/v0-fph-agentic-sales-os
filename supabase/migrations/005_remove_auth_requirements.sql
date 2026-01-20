-- Remove authentication requirements for all tables
-- Allow anonymous read/write operations

-- Drop existing authentication-based policies
DROP POLICY IF EXISTS "Admins can read all users" ON public.users;
DROP POLICY IF EXISTS "Allow anonymous read properties" ON public.properties;
DROP POLICY IF EXISTS "Allow authenticated insert properties" ON public.properties;
DROP POLICY IF EXISTS "Allow authenticated update properties" ON public.properties;
DROP POLICY IF EXISTS "Allow anonymous read integrations" ON public.integrations;
DROP POLICY IF EXISTS "Allow authenticated insert integrations" ON public.integrations;
DROP POLICY IF EXISTS "Allow authenticated update integrations" ON public.integrations;

-- Create new policies that allow anonymous operations
CREATE POLICY "Allow all operations on users" ON public.users
  FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Allow all operations on prospects" ON public.prospects
  FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Allow all operations on properties" ON public.properties
  FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Allow all operations on appointments" ON public.appointments
  FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Allow all operations on conversations" ON public.conversations
  FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Allow all operations on campaigns" ON public.campaigns
  FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Allow all operations on integrations" ON public.integrations
  FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Allow all operations on handoffs" ON public.handoffs
  FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Allow all operations on qa_reviews" ON public.qa_reviews
  FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Allow all operations on system_health" ON public.system_health
  FOR ALL USING (true) WITH CHECK (true);

-- Drop the admin function as it's no longer needed
DROP FUNCTION IF EXISTS public.is_admin(UUID);