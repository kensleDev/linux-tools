#!/bin/bash


# TODO - Replace with import
function MENU_TITLE () {

  echo ""
  echo "#============================"
  echo "# ${1}"
  echo "#============================"
  echo ""

}

function MULTI_MENU () {
  # customize with your own.
  clear
  options=("$@")

  menu() {
    echo "Avaliable options:"
    echo ""
    for i in ${!options[@]}; do
        printf "%3d%s) %s\n" $((i+1)) "${choices[i]:- }" "${options[i]}"
    done
    echo ""
    [[ "$msg" ]] && echo "$msg"; :
  }

  MENU_TITLE $1
  prompt="Check an option (again to uncheck, ENTER when done): "
  while menu && read -rp "$prompt" num && [[ "$num" ]]; do
      clear

      MENU_TITLE $1
      [[ "$num" != *[![:digit:]]* ]] &&
      (( num > 0 && num <= ${#options[@]} )) ||
      { msg="Invalid option: $num"; continue; }
      ((num--)); msg="${options[num]} was ${choices[num]:+un}checked"
      [[ "${choices[num]}" ]] && choices[num]="" || choices[num]="+"
  done

  sudo apt-get update

  #  printf "You selected"; msg=" nothing"
  for i in ${!options[@]}; do
      [[ "${choices[i]}" ]] && { sh "./${options[i]}.sh"; }
  done
  # echo "$msg"
}

MENU_OPTS=("commandLine" "linuxApps" "node" "docker" "vim" "vscode" "obs" "azure" )

MULTI_MENU "Installer" "${MENU_OPTS[@]}"
