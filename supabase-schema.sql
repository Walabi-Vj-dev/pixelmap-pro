-- PixelMap Pro - Schema Supabase
-- Ejecutar en Supabase → SQL Editor

-- Tabla de perfiles de usuario
create table if not exists public.profiles (
  id uuid references auth.users(id) on delete cascade primary key,
  email text not null,
  plan text not null default 'free' check (plan in ('free','pro','superop')),
  trial_exports integer not null default 0,
  mp_subscription_id text,
  mp_preapproval_id text,
  plan_expires_at timestamptz,
  plan_updated_at timestamptz,
  created_at timestamptz default now()
);

-- Habilitar RLS
alter table public.profiles enable row level security;

-- Políticas RLS
create policy "Users can view own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can update own trial count"
  on public.profiles for update
  using (auth.uid() = id)
  with check (auth.uid() = id);

-- Función para crear perfil automáticamente al registrarse
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, plan, trial_exports)
  values (new.id, new.email, 'free', 0)
  on conflict (id) do nothing;
  return new;
end;
$$ language plpgsql security definer;

-- Trigger para nuevos usuarios
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Dar plan superop al admin
-- (ejecutar después de registrarte con walabi@pixelmappro.com)
-- update public.profiles set plan = 'superop' where email = 'walabi@pixelmappro.com';
