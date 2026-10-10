#!/usr/bin/env python3
"""
rename_images_lowercase.py

Mengganti nama semua file gambar (dan opsional file lain) di sebuah folder
menjadi huruf kecil semua (lowercase), termasuk di semua subfolder.

Aman digunakan di Windows/Mac (filesystem case-insensitive) maupun Linux
(case-sensitive) karena menggunakan file sementara saat rename untuk
menghindari konflik nama.

CARA PAKAI:
    1. Langsung rename (default langsung apply):
       python rename_images_lowercase.py nama_folder

    2. Kalau mau intip dulu tanpa mengubah apapun (preview saja):
       python rename_images_lowercase.py nama_folder --dry-run

    3. Kalau ingin generate mapping nama lama -> nama baru ke file CSV
       (berguna untuk update referensi di HTML/CSS):
       python rename_images_lowercase.py nama_folder --log rename_log.csv
"""

import argparse
import csv
import os
import sys
import uuid

# Ekstensi yang dianggap "gambar". Tambahkan/kurangi sesuai kebutuhan.
IMAGE_EXTENSIONS = {
    ".jpg", ".jpeg", ".png", ".gif", ".webp",
    ".svg", ".bmp", ".ico", ".tiff", ".avif",
}


def collect_targets(root_dir, only_images=True, recursive=True):
    """Kumpulkan semua path file yang akan diproses."""
    targets = []
    if recursive:
        for dirpath, _dirnames, filenames in os.walk(root_dir):
            for fname in filenames:
                ext = os.path.splitext(fname)[1].lower()
                if only_images and ext not in IMAGE_EXTENSIONS:
                    continue
                targets.append(os.path.join(dirpath, fname))
    else:
        for fname in os.listdir(root_dir):
            full = os.path.join(root_dir, fname)
            if not os.path.isfile(full):
                continue
            ext = os.path.splitext(fname)[1].lower()
            if only_images and ext not in IMAGE_EXTENSIONS:
                continue
            targets.append(full)
    return targets


def rename_all(root_dir, apply=False, only_images=True, recursive=True, log_path=None):
    targets = collect_targets(root_dir, only_images=only_images, recursive=recursive)

    if not targets:
        print("Tidak ada file yang cocok ditemukan di folder ini.")
        return

    log_rows = []
    renamed_count = 0
    skipped_count = 0

    for old_path in targets:
        dirpath = os.path.dirname(old_path)
        old_name = os.path.basename(old_path)
        new_name = old_name.lower()

        if old_name == new_name:
            skipped_count += 1
            continue

        old_full = os.path.join(dirpath, old_name)
        new_full = os.path.join(dirpath, new_name)

        rel_old = os.path.relpath(old_full, root_dir)
        rel_new = os.path.relpath(new_full, root_dir)

        print(f"  {rel_old}  ->  {rel_new}")
        log_rows.append((rel_old, rel_new))

        if apply:
            # Trik dua langkah: rename ke nama sementara dulu, baru ke nama
            # lowercase final. Ini menghindari error di filesystem yang
            # case-insensitive (Windows/Mac) saat nama lama & baru hanya
            # beda kapitalisasi, misalnya Foto.JPG -> foto.jpg.
            temp_name = f"__tmp_rename_{uuid.uuid4().hex}{os.path.splitext(old_name)[1]}"
            temp_full = os.path.join(dirpath, temp_name)
            os.rename(old_full, temp_full)
            os.rename(temp_full, new_full)

        renamed_count += 1

    print()
    if apply:
        print(f"Selesai. {renamed_count} file di-rename, {skipped_count} file sudah lowercase (dilewati).")
    else:
        print(f"[DRY RUN] {renamed_count} file AKAN di-rename, {skipped_count} sudah lowercase.")
        print("Tidak ada perubahan dilakukan. Jalankan ulang dengan --apply untuk benar-benar rename.")

    if log_path and log_rows:
        with open(log_path, "w", newline="", encoding="utf-8") as f:
            writer = csv.writer(f)
            writer.writerow(["nama_lama", "nama_baru"])
            writer.writerows(log_rows)
        print(f"Log mapping disimpan ke: {log_path}")


def main():
    parser = argparse.ArgumentParser(
        description="Rename semua file gambar dalam folder (dan subfolder) menjadi huruf kecil."
    )
    parser.add_argument("folder", help="Path folder yang berisi gambar/file yang ingin di-rename")
    parser.add_argument(
        "--dry-run", action="store_true",
        help="Hanya preview, tidak benar-benar rename. Tanpa flag ini, rename langsung dijalankan."
    )
    parser.add_argument(
        "--all-files", action="store_true",
        help="Rename SEMUA jenis file, bukan hanya gambar (default: hanya file gambar)."
    )
    parser.add_argument(
        "--no-recursive", action="store_true",
        help="Jangan masuk ke subfolder, hanya folder utama saja."
    )
    parser.add_argument(
        "--log", metavar="FILE.csv", default=None,
        help="Simpan daftar nama_lama -> nama_baru ke file CSV (berguna untuk update referensi di kode)."
    )
    args = parser.parse_args()

    root_dir = args.folder
    if not os.path.isdir(root_dir):
        print(f"Error: folder tidak ditemukan: {root_dir}")
        sys.exit(1)

    apply = not args.dry_run
    mode = "APPLY (rename sungguhan)" if apply else "DRY RUN (preview saja)"
    scope = "SEMUA file" if args.all_files else "file GAMBAR saja"
    depth = "termasuk subfolder" if not args.no_recursive else "folder utama saja"

    print(f"Folder target : {root_dir}")
    print(f"Mode          : {mode}")
    print(f"Cakupan       : {scope}, {depth}")
    print("-" * 60)

    rename_all(
        root_dir,
        apply=apply,
        only_images=not args.all_files,
        recursive=not args.no_recursive,
        log_path=args.log,
    )


if __name__ == "__main__":
    main()
