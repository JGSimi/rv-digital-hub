-- Create RLS policies for the Users table to fix security vulnerability
-- The Users table appears to be a system table, so we'll create very restrictive policies

-- Policy 1: Users can only view their own record
CREATE POLICY "Users can view their own record"
ON public."Users"
FOR SELECT
TO authenticated
USING (auth.uid()::text = id::text);

-- Policy 2: Only authenticated users can insert their own record (if needed for system operations)
CREATE POLICY "Users can insert their own record"
ON public."Users"
FOR INSERT
TO authenticated
WITH CHECK (auth.uid()::text = id::text);

-- Policy 3: Users cannot update records (system managed)
-- No UPDATE policy = no updates allowed

-- Policy 4: Users cannot delete records (system managed)  
-- No DELETE policy = no deletes allowed