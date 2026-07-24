-- ==========================================
-- Telescroll Database Functions & Triggers
-- ==========================================

-- Update updated_at automatically

create or replace function public.update_updated_at()
returns trigger
language plpgsql
as $$
begin
    new.updated_at = now();
    return new;
end;
$$;

drop trigger if exists profiles_updated_at on public.profiles;

create trigger profiles_updated_at
before update on public.profiles
for each row
execute function public.update_updated_at();
create or replace function public.increment_scripts_count()
returns trigger
language plpgsql
as $$
begin

    update public.profiles
    set scripts_count = scripts_count + 1
    where id = new.scribe_id;

    return new;

end;
$$;

drop trigger if exists script_created on public.scripts;

create trigger script_created
after insert on public.scripts
for each row
execute function public.increment_scripts_count();
create or replace function public.decrement_scripts_count()
returns trigger
language plpgsql
as $$
begin

    update public.profiles
    set scripts_count = greatest(scripts_count - 1, 0)
    where id = old.scribe_id;

    return old;

end;
$$;

drop trigger if exists script_deleted on public.scripts;

create trigger script_deleted
after delete on public.scripts
for each row
execute function public.decrement_scripts_count();